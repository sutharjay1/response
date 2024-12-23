import * as React from "react";
import { cn } from "@/lib/utils";

const emailButtonVariants = {
  default: `
    background-color: #000000;
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  `,
  outline: `
    background-color: transparent;
    color: #000000;
    border: 1px solid #e2e8f0;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  `,
  ghost: `
    background-color: transparent;
    color: #000000;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  `,
  secondary: `
    background-color: #f1f5f9;
    color: #000000;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  `,
};

const sizeVariants = {
  default: `
    padding: 12px 24px;
    font-size: 14px;
  `,
  sm: `
    padding: 8px 16px;
    font-size: 12px;
  `,
  lg: `
    padding: 16px 32px;
    font-size: 16px;
  `,
};

interface EmailButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof emailButtonVariants;
  size?: keyof typeof sizeVariants;
  href: string;
}

export function EmailButton({
  variant = "default",
  size = "default",
  className,
  children,
  style,
  ...props
}: EmailButtonProps) {
  const buttonStyle = `
    ${emailButtonVariants[variant]}
    ${sizeVariants[size]}
  `;

  return (
    <a
      {...props}
      style={{
        ...style,
      }}
      className={cn(className)}
    >
      <table
        cellPadding="0"
        cellSpacing="0"
        style={{
          margin: "0 auto",
        }}
      >
        <tr>
          <td>
            <div style={{ margin: "0 auto" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      @media (prefers-color-scheme: dark) {
                        .email-button-${variant} {
                          background-color: ${
                            variant === "default"
                              ? "#ffffff !important"
                              : "transparent !important"
                          };
                          color: ${
                            variant === "default"
                              ? "#000000 !important"
                              : "#ffffff !important"
                          };
                          border-color: ${
                            variant === "outline"
                              ? "#ffffff !important"
                              : "transparent !important"
                          };
                        }
                      }
                    </style>
                  `,
                }}
              />
              <div
                className={`email-button-${variant}`}
                style={{
                  ...style,
                  ...{
                    WebkitTextSizeAdjust: "none",
                    textDecoration: "none",
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: `<style>${buttonStyle}</style><div style="${buttonStyle}">${children}</div>`,
                }}
              />
            </div>
          </td>
        </tr>
      </table>
    </a>
  );
}
