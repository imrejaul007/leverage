"""
Fraud detection service
"""
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
import re

class FraudSignal:
    """Represents a detected fraud signal."""
    def __init__(self, fraud_type: str, severity: str, entity_type: str, entity_id: str, description: str, confidence: float, evidence: Optional[Dict] = None):
        self.id = str(uuid.uuid4())
        self.type = fraud_type
        self.severity = severity
        self.entity_type = entity_type
        self.entity_id = entity_id
        self.description = description
        self.confidence = confidence
        self.evidence = evidence or {}
        self.status = "detected"
        self.created_at = datetime.utcnow()

class FraudDetectionService:
    """Service for detecting trade fraud."""

    # Known fraud patterns
    HIGH_RISK_COUNTRIES = ["IR", "KP", "SY", "CU", "VE"]
    SHELL_COMPANY_INDICATORS = ["offshore", "holdings", "investments", "trust", "global", "international", "capital"]

    def __init__(self):
        self.detected_signals: List[FraudSignal] = []

    def check_entity(self, entity: Dict[str, Any]) -> List[FraudSignal]:
        """Check entity for fraud indicators."""
        signals = []
        entity_type = entity.get("type", "unknown")
        entity_id = entity.get("id", "")
        name = entity.get("name", "").lower()
        country = entity.get("country", "").upper()

        # Sanctioned country check
        if country in self.HIGH_RISK_COUNTRIES:
            signals.append(FraudSignal(
                fraud_type="SANCTIONS_EVASION",
                severity="HIGH",
                entity_type=entity_type,
                entity_id=entity_id,
                description=f"Entity from high-risk jurisdiction: {country}",
                confidence=0.9,
                evidence={"country": country}
            ))

        # Shell company indicators
        for indicator in self.SHELL_COMPANY_INDICATORS:
            if indicator in name:
                signals.append(FraudSignal(
                    fraud_type="SHELL_COMPANY",
                    severity="MEDIUM",
                    entity_type=entity_type,
                    entity_id=entity_id,
                    description=f"Company name contains suspicious indicator: {indicator}",
                    confidence=0.6,
                    evidence={"name": name, "indicator": indicator}
                ))
                break

        # Missing registration
        if not entity.get("registration_number"):
            signals.append(FraudSignal(
                fraud_type="VERIFICATION_FAILURE",
                severity="MEDIUM",
                entity_type=entity_type,
                entity_id=entity_id,
                description="Entity registration cannot be verified",
                confidence=0.5
            ))

        # Very new company
        if entity.get("founded_date"):
            try:
                founded = datetime.fromisoformat(entity["founded_date"])
                if (datetime.utcnow() - founded).days < 180:
                    signals.append(FraudSignal(
                        fraud_type="NEW_ENTITY",
                        severity="LOW",
                        entity_type=entity_type,
                        entity_id=entity_id,
                        description="Company founded less than 6 months ago",
                        confidence=0.4
                    ))
            except: pass

        self.detected_signals.extend(signals)
        return signals

    def check_shipment(self, shipment: Dict[str, Any]) -> List[FraudSignal]:
        """Check shipment for fraud indicators."""
        signals = []
        shipment_id = shipment.get("id", "")

        # Mismatched value
        declared_value = shipment.get("declared_value", 0)
        if declared_value > 100000 and shipment.get("insurance_value", 0) < declared_value * 0.1:
            signals.append(FraudSignal(
                fraud_type="UNDERINSURANCE",
                severity="MEDIUM",
                entity_type="shipment",
                entity_id=shipment_id,
                description="Shipment significantly underinsured",
                confidence=0.7
            ))

        # Route through high-risk country
        transit = shipment.get("transit_countries", [])
        for country in transit:
            if country.upper() in self.HIGH_RISK_COUNTRIES:
                signals.append(FraudSignal(
                    fraud_type="CIRCUITOUS_ROUTING",
                    severity="HIGH",
                    entity_type="shipment",
                    entity_id=shipment_id,
                    description=f"Shipment transits high-risk country: {country}",
                    confidence=0.85,
                    evidence={"transit_countries": transit}
                ))

        return signals

    def check_payment(self, payment: Dict[str, Any]) -> List[FraudSignal]:
        """Check payment for fraud indicators."""
        signals = []
        payment_id = payment.get("id", "")

        # Multiple accounts for same entity
        if payment.get("payer_accounts_count", 0) > 3:
            signals.append(FraudSignal(
                fraud_type="MULTI_ACCOUNT",
                severity="MEDIUM",
                entity_type="payment",
                entity_id=payment_id,
                description="Payment from multiple accounts for same entity",
                confidence=0.6
            ))

        # Unusual payment method
        unusual_methods = ["cryptocurrency", "cash", "gift_card"]
        if payment.get("payment_method", "").lower() in unusual_methods:
            signals.append(FraudSignal(
                fraud_type="UNUSUAL_PAYMENT_METHOD",
                severity="HIGH",
                entity_type="payment",
                entity_id=payment_id,
                description=f"Unusual payment method: {payment.get('payment_method')}",
                confidence=0.75
            ))

        return signals

    def assess_overall_risk(self, signals: List[FraudSignal]) -> Dict[str, Any]:
        """Calculate overall risk score from signals."""
        if not signals:
            return {"risk_level": "LOW", "score": 0.0, "requires_review": False}

        total_score = sum(s.confidence * self._severity_weight(s.severity) for s in signals)
        avg_score = total_score / len(signals)

        # Determine severity
        if avg_score >= 0.7:
            level = "CRITICAL"
        elif avg_score >= 0.5:
            level = "HIGH"
        elif avg_score >= 0.3:
            level = "MEDIUM"
        else:
            level = "LOW"

        return {
            "risk_level": level,
            "score": min(avg_score, 1.0),
            "requires_review": avg_score >= 0.3,
            "signal_count": len(signals),
            "flagged_types": list(set(s.type for s in signals))
        }

    def _severity_weight(self, severity: str) -> float:
        weights = {"CRITICAL": 1.5, "HIGH": 1.2, "MEDIUM": 1.0, "LOW": 0.5}
        return weights.get(severity.upper(), 1.0)


# Global instance
fraud_detection = FraudDetectionService()
