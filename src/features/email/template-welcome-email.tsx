import { User } from "@prisma/client";
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

interface TemplateWelcomeEmailProps {
  user: Partial<User>;
}

export const TemplateWelcomeEmail = ({ user }: TemplateWelcomeEmailProps) => {
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
            `}
        </style>
      </Head>
      <Preview>Welcome to Response - Your Feedback Management Solution</Preview>
      <Body>
        <Container className="email-container">
          <Section className="email-header">
            <Img
              src="https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-no-border.png"
              alt="Response Logo"
              className="mx-auto h-full w-full"
            />
          </Section>

          <Section className="email-body">
            <Heading className="mb-4 text-2xl font-bold text-gray-800">
              Welcome, {user.name}!
            </Heading>

            <Text className="mb-6 text-gray-600">
              Congratulations! You&apos;re now part of the growing community of
              teams using <strong>Response</strong> to collect, analyze, and act
              on user feedback.
            </Text>

            <Text className="mb-6 text-3xl text-gray-600">
              Here&apos;s how to get started:
            </Text>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <strong>Deploy your first feedback form</strong>
                <br />
                Set up a feedback form to start collecting responses from users.
                You can embed the script on your website or app and start
                gathering valuable insights immediately.
              </li>
              <li>
                <strong>Analyze your feedback</strong>
                <br />
                Once you&apos;ve collected responses, explore detailed analytics
                to uncover trends and actionable insights. Make data-driven
                decisions with ease.
              </li>
              <li>
                <strong>Integrate with your workflow</strong>
                <br />
                Response integrates seamlessly with your existing tools.
                Discover integrations that help you automate processes and
                streamline feedback management.
              </li>
              <li>
                <strong>Customize your experience</strong>
                <br />
                Tailor your feedback system to your needs. Add custom questions,
                adjust design themes, and configure response handling for better
                user engagement.
              </li>
            </ul>

            <Text className="mb-6 text-3xl text-gray-600">Next Steps:</Text>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <a
                  href="https://response.sutharjay.com/dashboard"
                  className="text-blue-600 hover:underline"
                >
                  Go to your dashboard
                </a>
              </li>
              <li>
                <a
                  href="https://community.response.sutharjay.com/"
                  className="text-blue-600 hover:underline"
                >
                  Visit our forums to connect with other users
                </a>
              </li>
              <li>
                <a
                  href="https://docs.response.sutharjay.com/"
                  className="text-blue-600 hover:underline"
                >
                  Read the documentation
                </a>
              </li>
              <li>
                <a
                  href="https://support.response.sutharjay.com/"
                  className="text-blue-600 hover:underline"
                >
                  Contact our support team
                </a>
              </li>
            </ul>

            <Section className="mb-6 text-center">
              <Button
                href={`${process.env.URL}/projects`}
                className="rounded-2xl border border-[#201e1d]/80 px-8 py-4 font-medium shadow-inner"
              >
                Access Your Dashboard
              </Button>
            </Section>

            <Text className="mb-6 text-gray-600">
              If you no longer wish to receive these emails, you can{" "}
              <a href="#" className="text-blue-600 hover:underline">
                unsubscribe
              </a>
              .
            </Text>
          </Section>

          <Section className="bg-gray-50 p-4 text-center">
            <Text className="text-sm text-gray-500">
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
