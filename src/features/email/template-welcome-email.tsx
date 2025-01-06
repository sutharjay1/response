import { User } from "@prisma/client";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ResponseWelcomeEmailProps {
  user: Partial<User>;
}

export const TemplateWelcomeEmail = ({ user }: ResponseWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Get Feedback with Response - Your Feedback Management Solution
      </Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container className="mx-auto max-w-[600px] p-5">
            <Img
              src="https://utfs.io/f/xi8FFW9wN0K4PNaKiJSN1w5s87WjSGhcFdgu2OlEa3DYTLX6"
              width="50"
              height="50"
              alt="Response"
              className="mb-6"
            />

            <Section>
              <Heading className="mb-4 text-xl font-semibold text-zinc-900">
                Hey {user.name}, welcome to Response!
              </Heading>

              <Text className="mb-4 text-base text-zinc-600">
                We&apos;re excited to have you join our platform. Let&apo;s
                explore what makes Response special.
              </Text>

              <div className="space-y-2">
                <div className="rounded-xl border border-[#201e1d] bg-card px-0 py-6 text-card-foreground shadow transition-all">
                  <div className="relative rounded-lg border-[1px] border-zinc-800 p-0">
                    <Text className="mb-2 text-lg font-medium text-zinc-900">
                      Real-time Analytics
                    </Text>
                    <Text className="text-zinc-600">
                      Monitor feedback trends instantly with our powerful
                      dashboard. Track sentiment, response rates, and key
                      metrics in real-time.
                    </Text>
                  </div>
                </div>

                <div className="rounded-xl border border-[#201e1d] bg-card px-0 py-6 text-card-foreground shadow transition-all">
                  <div className="relative rounded-lg border-[1px] border-zinc-800 p-0">
                    <Text className="mb-2 text-lg font-medium text-zinc-900">
                      Smart Integration
                    </Text>
                    <Text className="text-zinc-600">
                      Seamlessly connect with your existing tools and workflows.
                      Import data from any source with our flexible API.
                    </Text>
                  </div>
                </div>

                <div className="rounded-xl border border-[#201e1d] bg-card px-0 py-6 text-card-foreground shadow transition-all">
                  <div className="relative rounded-lg border-[1px] border-zinc-800 p-0">
                    <Text className="mb-2 text-lg font-medium text-zinc-900">
                      Advanced Reporting
                    </Text>
                    <Text className="text-zinc-600">
                      Generate comprehensive insights with our visualization
                      tools. Create custom reports that matter to your team.
                    </Text>
                  </div>
                </div>
              </div>

              <Link
                className="mt-8 inline-block rounded-lg bg-[#0099ff] px-6 py-2 text-lg font-medium text-white hover:bg-[#0099ff]/95"
                href="https://response.sutharjay.com/projects"
              >
                Get Started Now
              </Link>

              <Hr className="my-6 border-zinc-200" />

              <Text className="text-sm text-zinc-400">
                Response Inc., 123 Feedback Street, Analytics City 12345
                <br />
                <Link
                  href="https://response.sutharjay.com/projects"
                  className="font-semibold text-zinc-400 no-underline"
                >
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
