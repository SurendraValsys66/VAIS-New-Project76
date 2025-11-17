import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

interface AgreementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isAlreadyConfirmed?: boolean;
}

const AGREEMENT_CONTENT = `MASTER SUBSCRIBER AGREEMENT – VAIS (Valasys AI)
Operated by Valasys Media LLC (New Jersey, USA)

1. DEFINITIONS
1. "Company" means Valasys Media LLC, incorporated in New Jersey, USA.
2. "Platform" means VAIS – Valasys AI, including but not limited to all tools, dashboards, analytics, AI models, scripts, and components.
3. "Subscriber" means any individual or entity accessing the Platform.
4. "Enterprise Subscriber" means Subscribers under a signed Enterprise Agreement.
5. "Self‑Serve Subscriber" means users subscribing via Stripe.
6. "Subscription Term" means the period of licensed access.

2. AGREEMENT STRUCTURE
Self-Serve Subscribers: governed by Stripe billing, strict no-refund policy, 48–72 hour email cancellation, and 7-day post-cancellation data retention.
Enterprise Subscribers: governed by this Agreement plus a customized Enterprise Order Form and separate Enterprise SLA, with 90-day data retention. Enterprise terms supersede conflicting Self‑Serve terms.

3. LICENSE GRANT
Company grants Subscriber a limited, non-exclusive, non-transferable, revocable license to use the Platform for internal business purposes. No ownership rights are transferred.

4. RESTRICTIONS
Subscriber shall NOT:
a. Reverse engineer, decompile, or attempt to extract source code, algorithms, model weights, or training data.
b. Reproduce, distribute, or create derivative works of the Platform.
c. Sell, sublicense, rent, lease, or share account access.
d. Use the Platform to build or train a competing AI product.
e. Use automation, scraping, bulk queries, or bypass rate limits without written authorization.
f. Use the Platform to generate unlawful, harmful, abusive, fraudulent, defamatory, hateful, or malicious content.
g. Use the Platform for spam, phishing, or unauthorized email generation.
h. Attempt prompt injection attacks or technical manipulation.
i. Access unauthorized areas or disrupt system integrity.

Violation may result in immediate suspension or termination without refund.

j. Prohibited Distribution of Exported Data
Once the Subscriber downloads or exports any data, reports, insights, or content from the Platform, the Subscriber shall not share, sell, rent, lease, sublicense, distribute, publish, or otherwise make such data available to any third party in any form.

Any unauthorized distribution, monetization, or disclosure of downloaded data shall constitute a material breach of this Agreement and will be treated as fraudulent activity under Company policy. The Company reserves the right to:
• immediately suspend or terminate the Subscriber's access without refund,
• pursue legal remedies, civil claims, or damages,
• notify relevant authorities in cases involving fraud or misuse.

The Subscriber agrees that downloaded data is provided solely for internal business use, and any external use without prior written consent from the Company is strictly prohibited.

5. PAYMENT TERMS
5.1 Payment Processing
All Self‑Serve payments are processed exclusively through Stripe. Enterprise payments may follow invoicing terms outlined in the Enterprise Order Form.

5.2 Card Storage & Authorization
By subscribing, Subscriber authorizes:
• Stripe to store payment details via PCI‑DSS Level 1 tokenization.
• Automatic recurring charges for renewals, upgrades, outstanding balances, and unpaid invoices.
Company does NOT store or access full card numbers.

Subscriber acknowledges:
• Removing a card does NOT cancel the subscription.
• Subscriber must maintain a valid payment method.

5.3 Auto-Renewal
Subscriptions renew automatically until cancelled by Subscriber per Section 6.

5.4 Strict No-Refund Policy
ALL FEES PAID ARE FINAL AND NON‑REFUNDABLE WITHOUT EXCEPTION, including:
• unused subscription time
• partial usage or non-usage
• dissatisfaction with Platform performance
• mid-cycle cancellation
• auto-renewal due to delayed cancellation
• prepaid amounts
• downgrades or plan changes

5.5 Taxes & Fees
Subscriber is responsible for all taxes, foreign exchange charges, bank fees, and cross-border fees imposed by payment providers.

6. CANCELLATION & TERMINATION
6.1 Self-Serve Cancellation
Subscriber may cancel ONLY by emailing [Insert Support Email] from the registered account email.
• Processing time: minimum 48 hours, up to 72 hours.
• Renewal charges falling within this window WILL APPLY.
• Cancellation becomes effective only upon Company's written confirmation.
• No refunds will be provided under any circumstance.

6.2 Enterprise Cancellation
Enterprise Subscribers may terminate with 30 days' written notice unless otherwise specified.

6.3 Termination for Cause
Company may immediately suspend or terminate access without refund if:
• Subscriber violates this Agreement
• fraudulent activity or chargeback is initiated
• payment fails and remains overdue
• misuse, abuse, or illegal activity is detected
• Subscriber jeopardizes system stability or security
Company may refuse future business or reinstatement at its sole discretion.

7. DATA RETENTION & DELETION
7.1 Self-Serve Retention
Upon cancellation:
• access ends immediately upon processing
• Subscriber retains access to historical data for 7 days
• after 7 days, data may be permanently deleted and unrecoverable
• Company has NO obligation to retrieve, restore, or recover deleted data

7.2 Enterprise Retention
Enterprise Subscribers receive 90-day retention unless otherwise stated in the Enterprise SLA.

7.3 No Backup Guarantee
Company does NOT guarantee:
• backups
• restore points
• disaster recovery
• long-term storage
• archival retention

Subscriber is solely responsible for exporting and securing data.
Company is NOT liable for:
• accidental deletion
• subscriber errors
• expired retention windows
• corruption caused by third-party systems

8. SERVICE AVAILABILITY & LIMITATIONS
Platform is provided "as is" and "as available." Company does not guarantee:
• uninterrupted uptime
• error-free operations
• AI accuracy or reliability
• integration compatibility
• performance speed

Enterprise uptime commitments, if applicable, are defined ONLY in the Enterprise SLA.

9. INTELLECTUAL PROPERTY
All rights, title, interest, and intellectual property in VAIS—including models, algorithms, UI/UX, data structures, prompts, automation, and code—belong exclusively to Valasys Media LLC.

Subscriber gains no ownership rights through use or payment.

10. CONFIDENTIALITY
Both Parties must protect confidential information with reasonable care and not disclose it to third parties except as required by law. Obligations survive termination.

11. SECURITY
Company employs commercially reasonable administrative, physical, and technical safeguards.

Company does NOT warrant:
• complete security
• prevention of unauthorized access
• absolute immunity from cyber incidents

Subscriber must maintain secure credentials and is liable for all activity under its account.

12. INDEMNIFICATION
Subscriber shall indemnify, defend, and hold harmless Company from claims arising out of:
• misuse of the Platform
• breach of this Agreement
• violation of laws or third-party rights
• generated content misuse
• unauthorized account activity

13. LIMITATION OF LIABILITY
To the maximum extent permitted by law, Company is NOT liable for:
• lost profits
• lost data
• business interruption
• indirect, incidental, special, punitive, exemplary, or consequential damages

Total liability SHALL NOT EXCEED the fees paid by Subscriber during the active Subscription Term.

Company bears no liability for actions of:
• Stripe
• hosting providers
• third‑party integrations
• internet or network failures

14. FORCE MAJEURE
Company is not liable for delays caused by events beyond reasonable control including natural disasters, cyberattacks, outages, war, government action, or provider failures.

15. GOVERNING LAW & DISPUTE RESOLUTION
This Agreement is governed exclusively by the laws of the State of New Jersey, USA.

All disputes shall be resolved in courts located in New Jersey.

16. AMENDMENTS
Company may update this Agreement at any time. Continued use constitutes acceptance.

17. ENTIRE AGREEMENT
This Agreement, Enterprise Order Forms, and the Enterprise SLA constitute the entire agreement. No oral statements modify it.`;

export default function AgreementModal({
  open,
  onOpenChange,
  onConfirm,
  isAlreadyConfirmed = false,
}: AgreementModalProps) {
  const [agreementConfirmed, setAgreementConfirmed] = useState(false);

  useEffect(() => {
    if (open && isAlreadyConfirmed) {
      setAgreementConfirmed(true);
    }
  }, [open, isAlreadyConfirmed]);

  const handleConfirm = () => {
    if (agreementConfirmed) {
      onConfirm();
      onOpenChange(false);
      setTimeout(() => {
        setAgreementConfirmed(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[75vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-valasys-orange/5 to-transparent">
          <DialogTitle className="text-2xl font-bold text-valasys-gray-900">
            Master Subscriber Agreement
          </DialogTitle>
          <DialogDescription className="mt-2 text-valasys-gray-600">
            Please review the document and confirm your understanding before
            proceeding
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Agreement Content Viewer */}
          <div className="flex-1 overflow-y-auto bg-white border-b">
            <div className="p-6 text-sm text-valasys-gray-800 leading-relaxed whitespace-pre-wrap">
              {AGREEMENT_CONTENT}
            </div>
          </div>

          {/* Checkboxes Section */}
          <div className="px-6 py-6 border-t bg-white space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="agreementConfirmed"
                  checked={agreementConfirmed}
                  onCheckedChange={(checked) =>
                    setAgreementConfirmed(checked === true)
                  }
                  className="w-5 h-5 rounded-none"
                />
                <label
                  htmlFor="agreementConfirmed"
                  className="text-sm text-valasys-gray-700 cursor-pointer"
                >
                  I have read the entire agreement, understood all the terms and
                  conditions, and I agree to the Master Subscriber Agreement
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t px-6 py-4 flex justify-center bg-white">
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!agreementConfirmed}
              className={`font-medium transition-all duration-200 flex items-center gap-2 ${
                agreementConfirmed
                  ? "bg-valasys-orange hover:bg-valasys-orange-light text-white"
                  : "bg-valasys-gray-200 text-valasys-gray-500 cursor-not-allowed"
              }`}
            >
              {agreementConfirmed && <Check className="w-4 h-4" />}
              I agree & confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
