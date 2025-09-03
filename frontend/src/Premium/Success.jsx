import React from "react";

function SubscriptionSuccess() {
  return (
    <div className="flex flex-col items-center justify-center p-10 m-20 bg-gray-100">
      <h1>
        Subscription <span className="text-green-500">Successful!</span>🎉
      </h1>
      <p>Your 30-day trial has started.</p>
      <p className="text-blue-500">Check your email for plan details</p>
      {/* Add more details/next steps */}
    </div>
  );
}

export default SubscriptionSuccess;
