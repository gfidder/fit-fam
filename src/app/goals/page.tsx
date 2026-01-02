export default function Goals() {
  return (
    <>
      <div className="p-8">
        <div className="mb-6 rounded-xl border-4 border-red-800 bg-red-600 p-5 text-center text-white">
          <h2 className="m-0 mb-2 text-3xl font-bold">
            🚫 PLEASE DO NOT PUSH THESE BUTTONS!!! 🚫
          </h2>
          <p className="m-0 text-lg font-semibold">
            Only Gabe should manage goal transitions
          </p>
        </div>

        <div className="mb-5 rounded-xl bg-gray-100 p-5">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Family Goal Phases
          </h3>
          <p className="mb-5 text-gray-600">
            Manage your family&apos;s sequential weight loss goals. Use the
            buttons below to move everyone to the next goal phase together.
          </p>

          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-lg border-l-4 border-red-600 bg-white p-4">
              <h4 className="mb-1 font-semibold text-gray-700">
                Initial Goal - May 26, 2026
              </h4>
              <p className="text-sm text-gray-600">
                Graduation, birthdays, weddings to attend
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-yellow-400 bg-white p-4">
              <h4 className="mb-1 font-semibold text-gray-700">
                Summer Goal - August 25, 2026
              </h4>
              <p className="text-sm text-gray-600">
                In shape for start of school year
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-green-600 bg-white p-4">
              <h4 className="mb-1 font-semibold text-gray-700">
                Year-End Goal - December 31, 2026
              </h4>
              <p className="text-sm text-gray-600">Start next year off right</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-yellow-500">
              Move Everyone to Summer Goal (Aug 25)
            </button>
            <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:bg-green-700">
              Move Everyone to Year-End Goal (Dec 31)
            </button>
            <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:bg-green-700">
              Reset Everyone to Initial Goal (May 26)
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-gray-100 p-5">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Weekly Target Calculations
          </h3>
          <p className="mb-4 text-gray-600">
            Weekly targets automatically recalculate based on remaining time and
            weight to lose.
          </p>
        </div>
      </div>
    </>
  );
}
