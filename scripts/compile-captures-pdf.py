import json
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from PyPDF2 import PdfMerger


def safe_open(path):
    image = Image.open(path)
    image.load()
    return image.convert("RGB")


def stitch_chunks(output_dir, page):
    screenshot_path = output_dir / page["screenshot"]
    screenshot_path.parent.mkdir(parents=True, exist_ok=True)
    chunks = [output_dir / chunk for chunk in page["chunks"]]

    if len(chunks) == 1:
        with safe_open(chunks[0]) as image:
            image.save(screenshot_path, "PNG", optimize=True)
        return screenshot_path

    opened = [safe_open(chunk) for chunk in chunks]
    width = max(image.width for image in opened)
    height = sum(image.height for image in opened)
    combined = Image.new("RGB", (width, height), (5, 5, 7))

    y = 0
    for image in opened:
        combined.paste(image, (0, y))
        y += image.height
        image.close()

    combined.save(screenshot_path, "PNG", optimize=True)
    combined.close()
    return screenshot_path


def fit_width(image, target_width):
    if image.width == target_width:
        return image
    ratio = target_width / image.width
    height = max(1, int(image.height * ratio))
    return image.resize((target_width, height), Image.Resampling.LANCZOS)


def draw_header(draw, title, part, total):
    font = ImageFont.load_default()
    text = f"{title}  |  part {part}/{total}"
    draw.rectangle((0, 0, 1440, 72), fill=(12, 12, 14))
    draw.text((28, 26), text, fill=(245, 245, 247), font=font)


def image_to_pdf_parts(output_dir, page, screenshot_path):
    pdf_part_dir = output_dir / "pdf-parts" / page["slug"]
    pdf_part_dir.mkdir(parents=True, exist_ok=True)
    part_paths = []
    target_width = 1440
    header_height = 72
    content_height = 1940

    with safe_open(screenshot_path) as original:
        image = fit_width(original, target_width)
        total_parts = max(1, math.ceil(image.height / content_height))

        for index, y in enumerate(range(0, image.height, content_height), start=1):
            crop = image.crop((0, y, target_width, min(y + content_height, image.height)))
            page_image = Image.new(
                "RGB",
                (target_width, header_height + crop.height),
                (12, 12, 14),
            )
            page_image.paste(crop, (0, header_height))
            draw = ImageDraw.Draw(page_image)
            draw_header(draw, page["title"], index, total_parts)

            part_path = pdf_part_dir / f"{index:03d}.pdf"
            page_image.save(part_path, "PDF", resolution=144)
            part_paths.append(part_path)
            crop.close()
            page_image.close()

        if image is not original:
            image.close()

    return part_paths


def main():
    if len(sys.argv) != 2:
        print("Usage: compile-captures-pdf.py <manifest.json>", file=sys.stderr)
        return 2

    manifest_path = Path(sys.argv[1]).resolve()
    output_dir = manifest_path.parent
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    merger = PdfMerger()
    pdf_parts = []

    for page in manifest["pages"]:
        screenshot_path = stitch_chunks(output_dir, page)
        page["screenshot"] = str(screenshot_path.relative_to(output_dir)).replace("\\", "/")
        parts = image_to_pdf_parts(output_dir, page, screenshot_path)
        pdf_parts.extend(parts)
        for part in parts:
            merger.append(str(part))

    pdf_path = output_dir / "bruniverse-full-page-screenshots.pdf"
    with pdf_path.open("wb") as pdf_file:
        merger.write(pdf_file)
    merger.close()

    manifest["pdf"] = pdf_path.name
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    readme = output_dir / "README.txt"
    readme.write_text(
        "\n".join(
            [
                "Bruniverse full-page screenshot backup",
                f"PDF: {pdf_path.name}",
                "Raw long screenshots: screenshots/",
                "Calculator screenshot evidence sections were expanded before capture.",
                "",
                "Captured pages:",
                *[f"- {page['title']}: {page['screenshot']}" for page in manifest["pages"]],
                "",
            ]
        ),
        encoding="utf-8",
    )

    print(f"PDF written: {pdf_path}")
    print(f"Long screenshots written: {output_dir / 'screenshots'}")


if __name__ == "__main__":
    raise SystemExit(main())
