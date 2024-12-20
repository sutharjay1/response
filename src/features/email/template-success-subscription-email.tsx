import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { TemplateSuccessSubscriptionProps } from "./actions/send-success-subscription-email";

export const TemplateSuccessSubscription = ({
  name,

  type,
  status,
  amount,
  orderId,
}: TemplateSuccessSubscriptionProps) => {
  const baseUrl = process.env.URL || "https://response.sutharjay.com";

  return (
    <Html>
      <Head>
        <style>
          {`
              @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
              body {
                font-family: "Geist", sans-serif;
                font-optical-sizing: auto;
                font-style: normal;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              .email-header {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                border-bottom: 1px solid #e9ecef;
              }
              .email-body {
                padding: 30px;
              }
              .feature-list {
                background-color: #f8f9fa;
                border-radius: 6px;
                padding: 20px;
                margin: 20px 0;
              }
              .feature-list li {
                margin-bottom: 10px;
                line-height: 1.5;
              }
              .button {
                display: inline-block;
                padding: 16px 32px;
                background-color: #ffffff;
                color: #201e1d;
                text-decoration: none;
                border-radius: 16px;
                border: 1px solid rgba(32, 30, 29, 0.8);
                font-weight: 500;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
              }
              .button:hover {
                background-color: #f8f9fa;
              }
              .link {
                color: #2563eb;
                text-decoration: none;
              }
              .link:hover {
                text-decoration: underline;
              }
            `}
        </style>
      </Head>
      <Preview>Welcome to Response - Your Feedback Management Solution</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", margin: "0", padding: "0" }}>
        <Container className="email-container">
          <Section className="email-header">
            <Img
              src="https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-no-border.png"
              alt="Response Logo"
              width={200}
              height={50}
              style={{ margin: "0 auto" }}
            />
          </Section>

          <Section className="email-body">
            <Heading
              style={{
                fontSize: "24px",
                color: "#1f2937",
                marginBottom: "16px",
              }}
            >
              Welcome, {name}!
            </Heading>

            <Text style={{ color: "#4b5563", marginBottom: "24px" }}>
              Congratulations! You&apos;re now part of the growing community of
              teams using <strong>Response</strong> to collect, analyze, and act
              on user feedback.
            </Text>

            <Text
              style={{
                fontSize: "20px",
                color: "#4b5563",
                marginBottom: "16px",
              }}
            >
              Here&apos;s how to get started:
            </Text>

            <Section className="feature-list">
              <Text style={{ marginBottom: "12px" }}>
                <strong>Deploy your first feedback form</strong>
                <br />
                Set up a feedback form to start collecting responses from users.
                You can embed the script on your website or app and start
                gathering valuable insights immediately.
              </Text>

              <Text style={{ marginBottom: "12px" }}>
                <strong>Analyze your feedback</strong>
                <br />
                Once you&apos;ve collected responses, explore detailed analytics
                to uncover trends and actionable insights. Make data-driven
                decisions with ease.
              </Text>

              <Text style={{ marginBottom: "12px" }}>
                <strong>Integrate with your workflow</strong>
                <br />
                Response integrates seamlessly with your existing tools.
                Discover integrations that help you automate processes and
                streamline feedback management.
              </Text>

              <Text style={{ marginBottom: "0" }}>
                <strong>Customize your experience</strong>
                <br />
                Tailor your feedback system to your needs. Add custom questions,
                adjust design themes, and configure response handling for better
                user engagement.
              </Text>
            </Section>

            <Text
              style={{
                fontSize: "20px",
                color: "#4b5563",
                marginBottom: "16px",
              }}
            >
              Next Steps:
            </Text>

            <Section style={{ marginBottom: "24px" }}>
              <Text style={{ marginBottom: "8px" }}>
                <a href={`${baseUrl}/dashboard`} className="link">
                  Go to your dashboard
                </a>
              </Text>
              <Text style={{ marginBottom: "8px" }}>
                <a
                  href="https://community.response.sutharjay.com/"
                  className="link"
                >
                  Visit our forums to connect with other users
                </a>
              </Text>
              <Text style={{ marginBottom: "8px" }}>
                <a href="https://docs.response.sutharjay.com/" className="link">
                  Read the documentation
                </a>
              </Text>
              <Text style={{ marginBottom: "8px" }}>
                <a
                  href="https://support.response.sutharjay.com/"
                  className="link"
                >
                  Contact our support team
                </a>
              </Text>
            </Section>

            <Section style={{ textAlign: "center", marginBottom: "24px" }}>
              <Button href={`${baseUrl}/projects`} className="button">
                Access Your Dashboard
              </Button>
            </Section>

            <Text style={{ fontSize: "14px", color: "#6b7280" }}>
              Order Details:
              <br />
              Order ID: {orderId}
              <br />
              Subscription Type: {type}
              <br />
              Amount: ${amount}
              <br />
              Status: {status}
            </Text>

            <Text
              style={{ fontSize: "14px", color: "#6b7280", marginTop: "24px" }}
            >
              If you no longer wish to receive these emails, you can{" "}
              <a href={`${baseUrl}/unsubscribe?id=${orderId}`} className="link">
                unsubscribe
              </a>
              .
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: "#f9fafb",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Text style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
              © 2024 Response - Transforming Feedback into Growth
              <br />
              Created by Jay Suthar
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
