import re


def mask_mobile(value):
    if not value:
        return value

    digits = re.sub(r"\D", "", str(value))

    if len(digits) >= 10:
        return digits[:2] + "*" * (len(digits) - 4) + digits[-2:]

    return str(value)


def mask_reference(value):
    if not value:
        return value

    value = str(value)

    if len(value) <= 4:
        return "*" * len(value)

    return value[:3] + "*" * (len(value) - 7) + value[-4:]


def mask_upi(value):
    if not value:
        return value

    value = str(value)

    if "@" not in value:
        return value

    username, domain = value.split("@", 1)

    if len(username) <= 2:
        masked_username = "*" * len(username)
    else:
        masked_username = username[:2] + "*" * (len(username) - 2)

    return masked_username + "@" + domain


def mask_email(value):
    if not value:
        return value

    value = str(value)

    if "@" not in value:
        return value

    username, domain = value.split("@", 1)

    if len(username) <= 2:
        masked_username = "*" * len(username)
    else:
        masked_username = username[:2] + "*" * (len(username) - 2)

    return masked_username + "@" + domain


def mask_account(value):
    if not value:
        return value

    digits = re.sub(r"\D", "", str(value))

    if len(digits) <= 4:
        return "X" * len(digits)

    return "X" * (len(digits) - 4) + digits[-4:]


def mask_sensitive_data(data):
    result = data.copy()

    if "mobile" in result:
        result["mobile"] = mask_mobile(result["mobile"])

    if "reference_no" in result:
        result["reference_no"] = mask_reference(result["reference_no"])

    if "upi" in result:
        result["upi"] = mask_upi(result["upi"])

    if "email" in result:
        result["email"] = mask_email(result["email"])

    if "account_no" in result:
        result["account_no"] = mask_account(result["account_no"])

    return result