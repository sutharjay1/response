import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TSmall } from "@/components/ui/typography";
import { aeonik, inter } from "@/features/font";
import { response } from "@/features/root/config";
import { cn, formatPrice } from "@/lib/utils";
import { CheckCircle, Minus, Rupee } from "@mynaui/icons-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="container mx-auto px-4 py-16">
          <BlurFade delay={0.1} inView>
            <div className="mx-auto w-full max-w-5xl pb-8 md:px-4">
              <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center space-y-2">
                <div className="flex w-fit items-center justify-center">
                  <Badge
                    icon={<Rupee className="h-4 w-4" />}
                    variant="default"
                    className="mx-auto mb-4 ml-2 rounded-full border border-input py-1 text-sm font-medium"
                  >
                    {response.pricing.badge}
                  </Badge>
                </div>
                <h2
                  className={cn(
                    "text-center text-3xl font-bold",
                    aeonik.className,
                  )}
                >
                  {response.pricing.title}
                </h2>
                <TSmall
                  className={cn(
                    "mb-4 text-center text-lg font-normal text-muted-foreground",
                    inter.variable,
                  )}
                >
                  {response.pricing.description}
                </TSmall>
              </div>
            </div>
          </BlurFade>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <BlurFade delay={0.1} inView>
              <Card className="group relative overflow-hidden rounded-3xl border-none bg-muted/40 p-2 shadow-none transition-all">
                <div className="rounded-3xl bg-sidebar py-1 shadow-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl">
                      {response.pricing.plans.free.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      The essentials to provide your best work for clients.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">
                        {response.pricing.plans.free.price}
                      </span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                    <Button className="mb-6 w-full">Get started</Button>
                    <ul className="space-y-3">
                      {response.pricing.plans.free.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <Card className="group relative overflow-hidden rounded-3xl border-none bg-muted/40 p-2 shadow-none transition-all">
                <div className="rounded-3xl bg-sidebar py-1 shadow-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl">
                      {response.pricing.plans.pro.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      A plan that scales with your rapidly growing business.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">
                        {formatPrice({
                          price: response.pricing.plans.pro.price,
                        })}
                      </span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                    <Button className="mb-6 w-full">Get started</Button>
                    <ul className="space-y-3">
                      {response.pricing.plans.pro.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <Card className="group relative overflow-hidden rounded-3xl border-none bg-muted/40 p-2 shadow-none transition-all">
                <div className="rounded-3xl bg-[#1e1e1e] py-1 text-sidebar shadow-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl">
                      {response.pricing.plans.premium.name}
                    </CardTitle>
                    <p className="text-sm text-zinc-400">
                      Dedicated support and infrastructure for your company.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">
                        {formatPrice({
                          price: response.pricing.plans.premium.price,
                        })}
                      </span>
                      <span className="ml-1 text-zinc-400">/month</span>
                    </div>
                    <Button
                      variant="outline"
                      className="mb-6 w-full bg-white/10 hover:bg-white/20"
                    >
                      Contact sales
                    </Button>
                    <ul className="space-y-3">
                      {response.pricing.plans.premium.features.map(
                        (feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-white" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            </BlurFade>
          </div>
        </div>

        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 divide-y divide-muted rounded-3xl bg-background">
            <div className="px-6 py-16 sm:px-8 lg:p-12">
              <BlurFade delay={0.1} inView>
                <div className="mx-auto w-full max-w-5xl md:px-4">
                  <div className="mx-auto flex w-full flex-col items-center justify-center space-y-2">
                    <h2
                      className={cn(
                        "text-center text-3xl font-bold",
                        aeonik.className,
                      )}
                    >
                      {response.pricing.feature.title}
                    </h2>
                    <TSmall
                      className={cn(
                        "mb-4 text-center text-lg font-normal text-muted-foreground",
                        inter.variable,
                      )}
                    >
                      {response.pricing.feature.description}
                    </TSmall>
                  </div>
                </div>
              </BlurFade>
              <div className="-mx-6 mt-8 overflow-hidden overflow-x-auto">
                <BlurFade delay={0.1} inView>
                  <table className="w-full">
                    <caption className="sr-only">Feature comparison</caption>

                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-semibold"
                        >
                          Features
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-semibold"
                        >
                          Starter
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-semibold"
                        >
                          Pro
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-semibold"
                        >
                          Premium
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted">
                      {response.pricing.feature.items.map((group) => (
                        <>
                          <tr key={group.name}>
                            <th
                              colSpan={4}
                              scope="colgroup"
                              className="rounded-lg bg-gradient-to-br from-[#37322f] to-[#201e1d] px-6 py-2 text-sm font-medium text-sidebar backdrop-blur-lg"
                            >
                              {group.name}
                            </th>
                          </tr>
                          {group.features.map((item) => (
                            <tr key={item.feature}>
                              <th
                                scope="row"
                                className="px-6 py-4 text-left text-sm font-normal"
                              >
                                {item.feature}
                              </th>
                              {[item.starter, item.growth, item.scale].map(
                                (value, i) => (
                                  <td key={i} className="px-6 py-4">
                                    {typeof value === "string" ? (
                                      <span className="text-sm">{value}</span>
                                    ) : value ? (
                                      <CheckCircle className="h-5 w-5 text-primary" />
                                    ) : (
                                      <Minus className="h-5 w-5 text-muted-foreground" />
                                    )}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </BlurFade>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
