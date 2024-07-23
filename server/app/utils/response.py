# app/utils/response.py
from typing import Any, Dict

def create_response(status: bool, message: str, entity: Any = None) -> Dict[str, Any]:
    return {
        "status": status,
        "message": message,
        "entity": entity
    }
