export default function CheckoutPage() {
  return (
    <main className="container-shell py-10">
      <div className="mx-auto max-w-2xl card p-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-2 text-sm text-black/70">Payment method: Cash on Delivery</p>
        <form className="mt-6 space-y-4">
          <input placeholder="Name" className="w-full rounded-xl border border-black/20 p-3" />
          <input placeholder="Phone" className="w-full rounded-xl border border-black/20 p-3" />
          <textarea placeholder="Address" className="h-28 w-full rounded-xl border border-black/20 p-3" />
          <button type="button" className="btn-primary w-full">Place Order</button>
        </form>
      </div>
    </main>
  );
}
