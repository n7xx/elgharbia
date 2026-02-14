import { Component } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (typeof this.props.onError === "function") {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center" role="alert">
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">حدث خطأ</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            حدث خطأ غير متوقع. يرجى تحديث الصفحة أو العودة للرئيسية.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => window.location.reload()}>تحديث الصفحة</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              الرئيسية
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
