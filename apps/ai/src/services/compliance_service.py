"""
Compliance service - Trade compliance advisor
"""
from typing import List, Dict, Any, Optional
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import os

COMPLIANCE_PROMPT = """You are a trade compliance expert for "Leverage by Lerar" - a global trade operating system.

Analyze the following trade scenario and provide compliance advice:

Product: {product}
Origin Country: {origin}
Destination Country: {destination}
Transport Mode: {transport_mode}
Incoterms: {incoterms}

Provide a JSON response with:
- is_compliant: boolean
- risk_level: "low", "medium", "high", or "critical"
- summary: brief explanation
- requirements: list of compliance requirements
- documents_needed: list of required documents
- warnings: list of potential issues
- recommended_actions: list of actions to take
"""

class ComplianceService:
    """Service for trade compliance advice."""

    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0.1, api_key=os.getenv("OPENAI_API_KEY"))
        self.prompt = PromptTemplate.from_template(COMPLIANCE_PROMPT)

    # Known restricted items by country
    RESTRICTED_ITEMS = {
        "CN": ["certain technologies", "cultural artifacts", "rare earth minerals"],
        "US": ["arms", "ammunition", "controlled technology"],
        "EU": ["conflict minerals", "illegal wildlife products"]
    }

    SANCTIONED_COUNTRIES = ["IR", "KP", "SY", "CU", "VE", "RU", "BY"]

    async def check_compliance(
        self,
        product_description: str,
        origin_country: str,
        destination_country: str,
        transport_mode: str = "ocean",
        incoterms: str = "FOB"
    ) -> Dict[str, Any]:
        """Check trade compliance for scenario."""
        origin = origin_country.upper()
        destination = destination_country.upper()

        # Quick checks
        if origin in self.SANCTIONED_COUNTRIES or destination in self.SANCTIONED_COUNTRIES:
            return {
                "is_compliant": False,
                "risk_level": "critical",
                "summary": f"Trade with {origin}/{destination} involves sanctioned countries",
                "requirements": ["Export/Import License Required", "Government Approval Required"],
                "documents_needed": ["export_license", "import_license", "customs_declaration"],
                "warnings": ["Sanctions may apply", "Additional scrutiny expected"],
                "recommended_actions": ["Verify with export control authority", "Obtain required licenses"]
            }

        # Use LLM for detailed analysis
        try:
            formatted = self.prompt.format(
                product=product_description,
                origin=origin_country,
                destination=destination_country,
                transport_mode=transport_mode,
                incoterms=incoterms
            )
            response = await self.llm.apredict(formatted)
            return self._parse_response(response)
        except Exception as e:
            return self._basic_check(product_description, origin, destination)

    def _basic_check(self, product: str, origin: str, destination: str) -> Dict[str, Any]:
        """Basic compliance check without LLM."""
        product_lower = product.lower()
        warnings = []
        documents = ["commercial_invoice", "packing_list", "bill_of_lading"]

        # Check for sensitive items
        sensitive_keywords = ["chemical", "weapon", "drug", "pharmaceutical"]
        if any(kw in product_lower for kw in sensitive_keywords):
            warnings.append("Item may require special permits")
            documents.append("export_license")

        return {
            "is_compliant": True,
            "risk_level": "low",
            "summary": "Basic compliance check passed",
            "requirements": ["Valid commercial invoice", "Proper documentation"],
            "documents_needed": documents,
            "warnings": warnings,
            "recommended_actions": ["Prepare standard documentation", "Verify with customs broker"]
        }

    def _parse_response(self, response: str) -> Dict[str, Any]:
        """Parse LLM response (simplified)."""
        # In production, use structured output or JSON parsing
        return {
            "is_compliant": True,
            "risk_level": "medium",
            "summary": response[:500] if len(response) > 500 else response,
            "requirements": [],
            "documents_needed": [],
            "warnings": [],
            "recommended_actions": []
        }


# Global instance
compliance_service = ComplianceService()
