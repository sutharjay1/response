import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PolicyLayout } from "@/features/policy/policy-layout";

export default function TermsPage() {
  return (
    <PolicyLayout
      heading="Terms & Conditions"
      lastUpdated="December 21, 2024"
      className="lg:py-12"
    >
      <ScrollArea>
        <div className="space-y-6 overflow-hidden">
          <section>
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on our website for personal,
              non-commercial transitory viewing only.
            </p>
            <p>
              This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose;</li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on the website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials;
              </li>
              <li>
                transfer the materials to another person or &quot;mirror&quot;
                the materials on any other server.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Disclaimer</h2>
            <p>
              The materials on our website are provided on an &apos;as is&apos;
              basis. We make no warranties, expressed or implied, and hereby
              disclaim and negate all other warranties including, without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Limitations</h2>
            <p>
              In no event shall our company or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on our website could include technical,
              typographical, or photographic errors. We do not warrant that any
              of the materials on its website are accurate, complete, or
              current.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Links</h2>
            <p>
              We have not reviewed all of the sites linked to its website and is
              not responsible for the contents of any such linked site. The
              inclusion of any link does not imply endorsement by us of the
              site. Use of any such linked website is at the user&apos;s own
              risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Modifications</h2>
            <p>
              We may revise these terms of service for its website at any time
              without notice. By using this website, you are agreeing to be
              bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </PolicyLayout>
  );
}
