import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body text-on-surface">
      <Header simple={true} />
      <ForgotPasswordForm />
      <Footer />
    </div>
  );
}
