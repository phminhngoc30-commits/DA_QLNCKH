import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LoginForm from "../components/auth/LoginForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body text-on-surface">
      <Header simple={true} />
      <LoginForm showNews={false} />
      <Footer />
    </div>
  );
}
