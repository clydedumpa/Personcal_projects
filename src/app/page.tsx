import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { profile } from "@/content/profile";

export default function Home() {
  return <PortfolioShowcase profile={profile} />;
}
