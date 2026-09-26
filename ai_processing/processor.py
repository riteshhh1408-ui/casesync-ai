import os
import json

from ai_processing.text_processor import process_text
from ai_processing.image_processor import process_image
from ai_processing.csv_parser import parse_csv
from ai_processing.extractor import create_event
from ai_processing.masking import mask_sensitive_data
from ai_processing.confidence import calculate_confidence
from ai_processing.missing import detect_missing_fields
from ai_processing.contradiction import detect_contradictions


def process_csv(file_path):
    """
    Process a CSV evidence file and return structured events.
    """

    records = parse_csv(file_path)

    events = []

    for record in records:

        event = create_event(
            date=record.get("date"),
            time=record.get("time"),
            event_type="transaction",
            amount=record.get("amount"),
            mobile=record.get("mobile"),
            upi=record.get("upi"),
            email=record.get("email"),
            url=record.get("url"),
            reference_no=record.get("reference_no"),
            account_no=record.get("account_no"),
            message=record.get("message"),
            source=os.path.basename(file_path)
        )

        event["confidence"] = calculate_confidence(event)

        event["missing_fields"] = detect_missing_fields(event)

        event = mask_sensitive_data(event)

        events.append(event)

    # Check for possible inconsistencies
    contradiction_flags = detect_contradictions(events)

    for flag in contradiction_flags:
        for index in flag["records"]:
            events[index]["flags"].append(flag["message"])

    return {
        "source": os.path.basename(file_path),
        "events": events
    }


def process_file(file_path):
    """
    Main entry point for CaseSync AI.

    Supported:
    CSV
    TXT
    PNG
    JPG
    JPEG
    """

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".csv":
        return process_csv(file_path)

    if extension == ".txt":
        return process_text(file_path)

    if extension in [".png", ".jpg", ".jpeg"]:
        return process_image(file_path)

    raise ValueError(
        f"Unsupported file type: {extension}. "
        "Supported types: CSV, TXT, PNG, JPG, JPEG"
    )

def process_file_json(file_path):
    """
    Process evidence and return a JSON string.
    """

    result = process_file(file_path)

    return json.dumps(result, indent=2, default=str)