import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PolicyLayout } from "@/features/policy/policy-layout";

export default function ContactPage() {
  return (
    <PolicyLayout heading="Contact Us" lastUpdated="December 21, 2024">
      <div className="space-y-8">
        <p className="text-lg">
          We&apos;re here to help! Please fill out the form below and we&apos;ll
          get back to you as soon as possible.
        </p>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your inquiry in detail..."
                className="min-h-[150px]"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            Send Message
          </Button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Other Ways to Reach Us</h2>

          <div className="space-y-2">
            <h3 className="font-medium">Email</h3>
            <a
              href="mailto:hello@sutharjay.com"
              className="tracking-normal text-muted-foreground"
            >
              hello@sutharjay.com
            </a>
          </div>
        </div>
      </div>
    </PolicyLayout>
  );
}
