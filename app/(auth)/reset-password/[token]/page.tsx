type Props = { params: { token: string } };

export default function ResetPasswordPage({ params }: Props) {
  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-card border border-neutral-gray/20 p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-2">Reset password</h1>
        <p className="text-neutral-gray text-sm">Token: <span className="font-mono text-neutral-dark/70">{params.token}</span></p>
      </div>
    </section>
  );
}
