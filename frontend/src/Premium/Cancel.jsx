import React from "react";

function SubscriptionCancel() {
  return (
    <div className="flex flex-col items-center justify-center p-10 m-20 bg-gray-100">
      <h1>
        Subscription <span className="text-red-500">Cancelled</span>
      </h1>
      <p>You can try again anytime.</p>
    </div>
  );
}

export default SubscriptionCancel;
