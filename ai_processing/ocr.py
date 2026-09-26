import os
import pytesseract
from PIL import Image
from pypdf import PdfReader


TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH


def extract_text_from_image(file_path):
    """
    Extract text from PNG/JPG/JPEG images.
    """

    image = Image.open(file_path)

    text = pytesseract.image_to_string(image)

    return text.strip()


def extract_text_from_pdf(file_path):
    """
    Extract text from a PDF.

    First attempts normal PDF text extraction.
    """

    reader = PdfReader(file_path)

    text_parts = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text_parts.append(page_text)

    return "\n".join(text_parts).strip()


def extract_text(file_path):
    """
    Extract text based on file type.

    Supported:
    PNG
    JPG
    JPEG
    PDF
    """

    extension = os.path.splitext(file_path)[1].lower()

    if extension in [".png", ".jpg", ".jpeg"]:
        return extract_text_from_image(file_path)

    if extension == ".pdf":
        return extract_text_from_pdf(file_path)

    raise ValueError(
        f"Unsupported OCR file type: {extension}"
    )