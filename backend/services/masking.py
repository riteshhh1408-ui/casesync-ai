def mask_mobile(value):
    value = str(value)

    if len(value) <= 4:
        return "*" * len(value)

    return value[:2] + "*" * (len(value) - 4) + value[-2:]


def mask_reference(value):
    value = str(value)

    if len(value) <= 4:
        return "*" * len(value)

    return value[:3] + "****" + value[-4:]


def mask_upi(value):
    value = str(value)

    if "@" not in value:
        return "****"

    username, domain = value.split("@", 1)

    if len(username) <= 2:
        masked_username = "*" * len(username)
    else:
        masked_username = username[:2] + "***"

    return masked_username + "@" + domain


def mask_record(record):
    masked = record.copy()

    if "mobile" in masked:
        masked["mobile"] = mask_mobile(masked["mobile"])

    if "reference_no" in masked:
        masked["reference_no"] = mask_reference(masked["reference_no"])

    if "upi" in masked:
        masked["upi"] = mask_upi(masked["upi"])

    return masked