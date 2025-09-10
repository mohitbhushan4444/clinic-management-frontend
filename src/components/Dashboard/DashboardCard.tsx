import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  iconColor?: string;
}

const DashboardCard = ({ title, description, icon: Icon, onClick, iconColor = "text-primary" }: DashboardCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-hover hover:scale-105 bg-card border-border"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            {description}
          </CardDescription>
        </div>
        <div className="ml-4">
          <Icon className={`h-12 w-12 ${iconColor}`} />
        </div>
      </CardHeader>
    </Card>
  );
};

export default DashboardCard;