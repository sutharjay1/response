// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Img,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";
// import { TemplateSuccessSubscriptionProps } from "./actions/send-success-subscription-email";

// export const TemplateSuccessSubscription = ({
//   name,
//   type,
//   status,
//   amount,
//   orderId,
// }: TemplateSuccessSubscriptionProps) => {
//   const baseUrl = process.env.URL || "https://response.sutharjay.com";

//   return (
//     <Html>
//       <Head>
//         <style>
//           {`
//               @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
//               body {
//                 font-family: "Geist", sans-serif;
//                 font-optical-sizing: auto;
//                 font-style: normal;
//                 margin: 0;
//                 padding: 0;
//                 background-color: #f4f4f4;
//               }
//               .email-container {
//                 max-width: 600px;
//                 margin: 0 auto;
//                 background-color: white;
//                 border-radius: 8px;
//                 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                 overflow: hidden;
//               }
//               .email-header {
//                 background-color: #f8f9fa;
//                 padding: 20px;
//                 text-align: center;
//                 border-bottom: 1px solid #e9ecef;
//               }
//               .email-body {
//                 padding: 30px;
//               }
//               .feature-list {
//                 background-color: #f8f9fa;
//                 border-radius: 6px;
//                 padding: 20px;
//                 margin: 20px 0;
//               }
//               .feature-list li {
//                 margin-bottom: 10px;
//                 line-height: 1.5;
//               }
//               .button {
//                 display: inline-block;
//                 padding: 16px 32px;
//                 background-color: #ffffff;
//                 color: #201e1d;
//                 text-decoration: none;
//                 border-radius: 16px;
//                 border: 1px solid rgba(32, 30, 29, 0.8);
//                 font-weight: 500;
//                 box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
//               }
//               .button:hover {
//                 background-color: #f8f9fa;
//               }
//               .link {
//                 color: #2563eb;
//                 text-decoration: none;
//               }
//               .link:hover {
//                 text-decoration: underline;
//               }
//             `}
//         </style>
//       </Head>
//       <Preview>Welcome to Response - Your Feedback Management Solution</Preview>
//       <Body style={{ backgroundColor: "#f4f4f4", margin: "0", padding: "0" }}>
//         <Container className="email-container">
//           <Section className="email-header">
//             <Img
//               src="https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-no-border.png"
//               alt="Response Logo"
//               width={200}
//               height={50}
//               style={{ margin: "0 auto" }}
//             />
//           </Section>

//           <Section className="email-body">
//             <Heading
//               style={{
//                 fontSize: "24px",
//                 color: "#1f2937",
//                 marginBottom: "16px",
//               }}
//             >
//               Welcome, {name}!
//             </Heading>

//             <Text style={{ color: "#4b5563", marginBottom: "24px" }}>
//               Congratulations! You&apos;re now part of the growing community of
//               teams using <strong>Response</strong> to collect, analyze, and act
//               on user feedback.
//             </Text>

//             <Text
//               style={{
//                 fontSize: "20px",
//                 color: "#4b5563",
//                 marginBottom: "16px",
//               }}
//             >
//               Here&apos;s how to get started:
//             </Text>

//             <Section className="feature-list">
//               <Text style={{ marginBottom: "12px" }}>
//                 <strong>Deploy your first feedback form</strong>
//                 <br />
//                 Set up a feedback form to start collecting responses from users.
//                 You can embed the script on your website or app and start
//                 gathering valuable insights immediately.
//               </Text>

//               <Text style={{ marginBottom: "12px" }}>
//                 <strong>Analyze your feedback</strong>
//                 <br />
//                 Once you&apos;ve collected responses, explore detailed analytics
//                 to uncover trends and actionable insights. Make data-driven
//                 decisions with ease.
//               </Text>

//               <Text style={{ marginBottom: "12px" }}>
//                 <strong>Integrate with your workflow</strong>
//                 <br />
//                 Response integrates seamlessly with your existing tools.
//                 Discover integrations that help you automate processes and
//                 streamline feedback management.
//               </Text>

//               <Text style={{ marginBottom: "0" }}>
//                 <strong>Customize your experience</strong>
//                 <br />
//                 Tailor your feedback system to your needs. Add custom questions,
//                 adjust design themes, and configure response handling for better
//                 user engagement.
//               </Text>
//             </Section>

//             <Text
//               style={{
//                 fontSize: "20px",
//                 color: "#4b5563",
//                 marginBottom: "16px",
//               }}
//             >
//               Next Steps:
//             </Text>

//             <Section style={{ marginBottom: "24px" }}>
//               <Text style={{ marginBottom: "8px" }}>
//                 <a href={`${baseUrl}/dashboard`} className="link">
//                   Go to your dashboard
//                 </a>
//               </Text>
//               <Text style={{ marginBottom: "8px" }}>
//                 <a
//                   href="https://community.response.sutharjay.com/"
//                   className="link"
//                 >
//                   Visit our forums to connect with other users
//                 </a>
//               </Text>
//               <Text style={{ marginBottom: "8px" }}>
//                 <a href="https://docs.response.sutharjay.com/" className="link">
//                   Read the documentation
//                 </a>
//               </Text>
//               <Text style={{ marginBottom: "8px" }}>
//                 <a
//                   href="https://support.response.sutharjay.com/"
//                   className="link"
//                 >
//                   Contact our support team
//                 </a>
//               </Text>
//             </Section>

//             <Section style={{ textAlign: "center", marginBottom: "24px" }}>
//               <Button href={`${baseUrl}/projects`} className="button">
//                 Access Your Dashboard
//               </Button>
//             </Section>

//             <Text style={{ fontSize: "14px", color: "#6b7280" }}>
//               Order Details:
//               <br />
//               Order ID: {orderId}
//               <br />
//               Subscription Type: {type}
//               <br />
//               Amount: ${amount}
//               <br />
//               Status: {status}
//             </Text>

//             <Text
//               style={{ fontSize: "14px", color: "#6b7280", marginTop: "24px" }}
//             >
//               If you no longer wish to receive these emails, you can{" "}
//               <a href={`${baseUrl}/unsubscribe?id=${orderId}`} className="link">
//                 unsubscribe
//               </a>
//               .
//             </Text>
//           </Section>

//           <Section
//             style={{
//               backgroundColor: "#f9fafb",
//               padding: "16px",
//               textAlign: "center",
//             }}
//           >
//             <Text style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
//               © 2024 Response - Transforming Feedback into Growth
//               <br />
//               Created by Jay Suthar
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// };

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle } from "@mynaui/icons-react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface TemplateSuccessSubscriptionProps {
  name: string;
  type: string;
  status: string;
  amount: string;
  orderId: string;
}

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
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              -webkit-font-smoothing: antialiased;
              margin: 0;
              padding: 0;
              background-color: #fafafa;
              color: #0f172a;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
            }
            .header {
              background: linear-gradient(to right, #2563eb, #3b82f6);
              padding: 32px;
              text-align: center;
              border-radius: 16px 16px 0 0;
            }
            .logo {
              background-color: white;
              padding: 16px;
              border-radius: 12px;
              display: inline-block;
            }
            .content {
              padding: 32px;
            }
            .feature-card {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 24px;
              margin-bottom: 16px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background: linear-gradient(to right, #2563eb, #3b82f6);
              color: #ffffff;
              text-decoration: none;
              border-radius: 12px;
              font-weight: 500;
              text-align: center;
              transition: all 0.2s ease;
            }
            .button:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .order-card {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 24px;
              margin-top: 32px;
            }
            .success-badge {
              background-color: #dcfce7;
              color: #166534;
              padding: 4px 12px;
              border-radius: 9999px;
              font-size: 14px;
              font-weight: 500;
              display: inline-block;
              margin-bottom: 16px;
            }
            .divider {
              height: 1px;
              background-color: #e2e8f0;
              margin: 32px 0;
            }
            .footer {
              background-color: #f8fafc;
              padding: 24px;
              text-align: center;
              border-radius: 0 0 16px 16px;
              border-top: 1px solid #e2e8f0;
            }
          `}
        </style>
      </Head>
      <Preview>
        Welcome to Response - Your subscription is confirmed! 🎉
      </Preview>
      <Body style={{ backgroundColor: "#fafafa" }}>
        <Container className="container">
          <Card>
            <Section className="header">
              <div className="logo">
                <Img
                  src="https://res.cloudinary.com/cdn-feedback/image/upload/v1733506409/response/response-no-border.png"
                  alt="Response Logo"
                  width={140}
                  height={35}
                />
              </div>
            </Section>

            <CardHeader>
              <div className="success-badge">
                <CheckCircle className="mr-2 inline-block h-4 w-4" />
                Subscription Activated
              </div>
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  margin: "0 0 8px",
                }}
              >
                Welcome to Response, {name}!
              </Text>
              <Text style={{ fontSize: "16px", color: "#475569", margin: "0" }}>
                Your journey to better feedback management starts here.
              </Text>
            </CardHeader>

            <CardContent>
              <Text
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Here&apos;s what you can do with Response:
              </Text>

              <div className="feature-card">
                <Text style={{ fontWeight: "500", margin: "0 0 8px" }}>
                  🎯 Deploy Custom Forms
                </Text>
                <Text style={{ margin: "0", color: "#475569" }}>
                  Create and customize feedback forms that match your brand
                  identity
                </Text>
              </div>

              <div className="feature-card">
                <Text style={{ fontWeight: "500", margin: "0 0 8px" }}>
                  📊 Real-time Analytics
                </Text>
                <Text style={{ margin: "0", color: "#475569" }}>
                  Track and analyze feedback with powerful visualization tools
                </Text>
              </div>

              <div className="feature-card">
                <Text style={{ fontWeight: "500", margin: "0 0 8px" }}>
                  🔄 Seamless Integration
                </Text>
                <Text style={{ margin: "0", color: "#475569" }}>
                  Connect with your favorite tools and automate your workflow
                </Text>
              </div>

              <div className="order-card">
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "16px",
                  }}
                >
                  Subscription Details
                </Text>
                <div style={{ display: "grid", gap: "8px", color: "#475569" }}>
                  <Text style={{ margin: "0" }}>
                    <strong>Plan:</strong> {type}
                  </Text>
                  <Text style={{ margin: "0" }}>
                    <strong>Amount:</strong> ${amount}
                  </Text>
                  <Text style={{ margin: "0" }}>
                    <strong>Status:</strong> {status}
                  </Text>
                  <Text style={{ margin: "0" }}>
                    <strong>Order ID:</strong> {orderId}
                  </Text>
                </div>
              </div>
            </CardContent>

            <CardFooter style={{ flexDirection: "column", gap: "24px" }}>
              <Button href={`${baseUrl}/dashboard`}>
                Access Your Dashboard
              </Button>

              <div className="divider" />

              <Text
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Need help getting started?{" "}
                <a
                  href="https://docs.response.sutharjay.com/"
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  Visit our documentation
                </a>
              </Text>
            </CardFooter>

            <Section className="footer">
              <Text style={{ fontSize: "12px", color: "#64748b", margin: "0" }}>
                © 2024 Response. All rights reserved.
              </Text>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  margin: "8px 0 0",
                }}
              >
                You&apos;re receiving this email because you subscribed to
                Response.{" "}
                <a
                  href={`${baseUrl}/unsubscribe?id=${orderId}`}
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Card>
        </Container>
      </Body>
    </Html>
  );
};
