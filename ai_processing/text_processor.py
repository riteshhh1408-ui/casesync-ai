import os

from ai_processing.entity_extractor import extract_entities
from ai_processing.masking import mask_sensitive_data


def process_text(file_path):
    """
    Read a TXT evidence file and extract entities.
    Sensitive information is masked in both fields and message text.
    """

    with open(file_path, "r", encoding="utf-8") as file:
        text = file.read()

    entities = extract_entities(text)

    event = {
        "event_type": "message",
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

    # Mask individual structured fields
    event = mask_sensitive_data(event)

    # Mask sensitive information inside the original message
    masked_text = text

    for original in entities["mobile"]:
        masked = mask_sensitive_data({"mobile": original})["mobile"]
        masked_text = masked_text.replace(original, masked)

    for original in entities["upi"]:
        masked = mask_sensitive_data({"upi": original})["upi"]
        masked_text = masked_text.replace(original, masked)

    for original in entities["email"]:
        masked = mask_sensitive_data({"email": original})["email"]
        masked_text = masked_text.replace(original, masked)

    for original in entities["reference_no"]:
        masked = mask_sensitive_data(
            {"reference_no": original}
        )["reference_no"]

        masked_text = masked_text.replace(original, masked)

    for original in entities["account_no"]:
        masked = mask_sensitive_data(
            {"account_no": original}
        )["account_no"]

        masked_text = masked_text.replace(original, masked)

    event["message"] = masked_text

    return {
        "source": os.path.basename(file_path),
        "events": [event]
    }