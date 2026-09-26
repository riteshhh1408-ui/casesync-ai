import pandas as pd


def parse_csv(file_path):
    """
    Read a CSV evidence file and convert each row
    into a dictionary.

    Returns:
        list[dict]
    """

    try:
        df = pd.read_csv(file_path)

        # Replace NaN values with None
        df = df.where(pd.notnull(df), None)

        records = df.to_dict(orient="records")

        return records

    except Exception as e:
        raise ValueError(f"Unable to parse CSV file: {str(e)}")