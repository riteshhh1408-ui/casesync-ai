REQUIRED_FIELDS = [
    "event_type",
    "date",
    "amount",
    "source"
]


def detect_missing_fields(event):
    missing = []

    for field in REQUIRED_FIELDS:
        value = event.get(field)

        if value is None or value == "":
            missing.append(field)

    return missing