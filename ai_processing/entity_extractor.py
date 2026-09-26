import re


def extract_entities(text):
    """
    Extract common entities from text.

    This only detects patterns.
    It does not determine whether information is genuine
    or whether fraud occurred.
    """

    entities = {
        "mobile": [],
        "upi": [],
        "email": [],
        "url": [],
        "reference_no": [],
        "account_no": []
    }

    if not text:
        return entities

    text = str(text)

    # -------------------------
    # Mobile numbers
    # -------------------------
    entities["mobile"] = re.findall(
        r"(?<!\d)(?:\+91[\s-]?)?[6-9]\d{9}(?!\d)",
        text
    )

    # -------------------------
    # Email addresses
    # -------------------------
    entities["email"] = re.findall(
        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
        text
    )

    # -------------------------
    # UPI IDs
    # -------------------------
    upi_matches = re.findall(
        r"\b[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\b",
        text
    )

    entities["upi"] = [
        value
        for value in upi_matches
        if value not in entities["email"]
    ]

    # -------------------------
    # URLs
    # -------------------------
    entities["url"] = re.findall(
        r"https?://[^\s]+",
        text
    )

    # -------------------------
    # Reference / Transaction IDs
    # -------------------------

    # Standard IDs such as:
    # TXN982736451
    # REF982736451
    # UTR982736451
    standard_refs = re.findall(
        r"\b(?:TXN|UTR|REF)[-_]?[A-Z0-9]{6,}\b",
        text.upper()
    )

    # IDs explicitly appearing after labels such as:
    # PhonePe Transaction ID
    # Transaction ID
    # UTR:
    labelled_refs = re.findall(
        r"(?:PHONEPE\s+TRANSACTION\s+ID|TRANSACTION\s+ID|UTR|REFERENCE)"
        r"\s*:?\s*([A-Z]*\d{6,})",
        text.upper()
    )

    entities["reference_no"] = list(
        dict.fromkeys(standard_refs + labelled_refs)
    )

    # -------------------------
    # Account numbers
    # -------------------------
    #
    # Only extract an account number when the text
    # explicitly labels it as an account number.
    #
    account_matches = re.findall(
        r"(?:ACCOUNT(?:\s+NUMBER|\s+NO\.?)?)"
        r"\s*:?\s*(\d{9,18})\b",
        text,
        re.IGNORECASE
    )

    entities["account_no"] = account_matches

    return entities