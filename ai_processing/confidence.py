def calculate_confidence(event):
    """
    Calculate simple rule-based confidence scores.

    This does NOT determine whether the evidence is genuine.
    It only measures how clearly a field was extracted.
    """

    confidence = {}

    for field, value in event.items():

        if field in [
            "confidence",
            "missing_fields",
            "flags"
        ]:
            continue

        if value is not None and value != "":
            confidence[field] = 0.95
        else:
            confidence[field] = 0.0

    return confidence