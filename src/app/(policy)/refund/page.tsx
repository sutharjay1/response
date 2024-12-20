import { PolicyLayout } from "@/features/policy/policy-layout";

export default function RefundsPage() {
  return (
    <PolicyLayout
      heading="Refunds & Cancellations"
      lastUpdated="December 21, 2024"
      className="lg:py-12"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Refund Policy</h2>
          <p>
            We want you to be completely satisfied with our services. If you are
            not satisfied with your purchase, we offer a refund policy as
            outlined below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Eligibility for Refunds</h2>
          <p>
            To be eligible for a refund, your request must meet the following
            criteria:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Request must be made within 30 days of purchase</li>
            <li>Service must not have been fully utilized</li>
            <li>Account must be in good standing</li>
            <li>Valid reason for refund must be provided</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Refund Process</h2>
          <p>To request a refund:</p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Contact our support team through the contact form</li>
            <li>Provide your order number and reason for refund</li>
            <li>Allow up to 5-7 business days for review</li>
            <li>
              If approved, refund will be processed to original payment method
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Cancellation Policy</h2>
          <p>
            You may cancel your subscription or service at any time. Here&apos;s
            what you need to know about cancellations:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Cancellations take effect at the end of the current billing cycle
            </li>
            <li>
              No partial refunds for unused portions of the current billing
              period
            </li>
            <li>
              Access to services continues until the end of the paid period
            </li>
            <li>
              Data may be retained for a period of 30 days after cancellation
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Non-Refundable Items</h2>
          <p>The following items and services are non-refundable:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Custom or personalized services</li>
            <li>Digital downloads that have been accessed</li>
            <li>Services fully rendered</li>
            <li>Administrative fees</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions about our refund and cancellation
            policies, please contact our support team through at{" "}
            <a
              href="mailto:hello@sutharjay.com"
              className="tracking-normal text-muted-foreground"
            >
              hello@sutharjay.com
            </a>
            .
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
