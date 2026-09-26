import os

from ai_processing.ocr import extract_text
from ai_processing.entity_extractor import extract_entities
from ai_processing.masking import mask_sensitive_data


def process_image(file_path):
    """
    Process an image using OCR and entity extraction.
    """

    text = extract_text(file_path)

    entities = extract_entities(text)

    event = {
        "event_type": "transaction",
        "date": None,
        "time": None,
        "amount": None,
        "mobile": entities["mobile"][0] if entities["mobile"] else None,
        "upi": entities["upi"][0] if entities["upi"] else None,
        "email": entities["email"][0] if entities["email"] else None,
        "url": entities["url"][0] if entities["url"] else None,
        "reference_no": (
            entities["reference_no"][0]
            if entities["reference_no"]
            else None
        ),
        "account_no": (
            entities["account_no"][0]
            if entities["account_no"]
            else None
        ),
        "message": text,
        "source": os.path.basename(file_path),
        "confidence": {},
        "missing_fields": [],
        "flags": []
    }

    event = mask_sensitive_data(event)

    return {
        "source": os.path.basename(file_path),
        "events": [event]
    }