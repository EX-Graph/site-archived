import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite";
import type { DropdownOptions } from "flowbite";

import type { BenchmarkEntry } from "../../db/benchmarks.ts";

const Submissions = () => {
  const [displayedSubmissions, setDisplayedSubmissions] = useState<
    (
      BenchmarkEntry & {
        updateDropDownTarget: React.RefObject<HTMLDivElement> | null;
        updateDropDownTrigger: React.RefObject<HTMLButtonElement> | null;
      }
    )[]
  >([]);

  const updateDisplayedSubmissions = async () => {
    // fetch submissions
    await fetch("/api/admin/benchmarks")
      .then((res) => res.json())
      .then((data) =>
        setDisplayedSubmissions(data.map((result: BenchmarkEntry) => ({
          ...result,
          updateDropDownTarget: React.createRef<HTMLDivElement>(),
          updateDropDownTrigger: React.createRef<HTMLButtonElement>(),
        })))
      );
  };

  useEffect(() => {
    updateDisplayedSubmissions();
  }, []);

  useEffect(() => {
    // activate dropdowns
    displayedSubmissions.forEach((result) => {
      if (
        result.updateDropDownTrigger?.current &&
        result.updateDropDownTarget?.current
      ) {
        const dropDownOptions: DropdownOptions = {
          placement: "top",
          triggerType: "click",
          offsetSkidding: 0,
          offsetDistance: 10,
          delay: 300,
          ignoreClickOutsideClass: false,
        };
        new Dropdown(
          result.updateDropDownTarget.current,
          result.updateDropDownTrigger.current,
          dropDownOptions,
        );
        console.log("Dropdowns activated for", result.id);
      } else {
        console.error("Error: dropdowns not activated");
      }
    });
  }, [displayedSubmissions]);

  return (
    <div className="relative overflow-x-auto min-h-fit shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-0">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Leaderboard</th>
            <th scope="col" className="px-6 py-3">Submission Time (local)</th>
            <th scope="col" className="px-6 py-3">Method</th>
            <th scope="col" className="px-6 py-3">Test AUC-ROC</th>
            <th scope="col" className="px-6 py-3">Test Precision</th>
            <th scope="col" className="px-6 py-3">Test Recall</th>
            <th scope="col" className="px-6 py-3">Test F1</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">References</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedSubmissions.map((result) => (
            <tr
              key={result.id}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <td className="px-6 py-4">
                {result.leaderboard}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(new Date(result.timestamp)).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {result.method}
              </td>
              <td className="px-6 py-4">
                {result.testAucRoc}
              </td>
              <td className="px-6 py-4">
                {result.testPrecision}
              </td>
              <td className="px-6 py-4">
                {result.testRecall}
              </td>
              <td className="px-6 py-4">
                {result.testF1}
              </td>
              <td className="px-6 py-4">
                {result.name}
              </td>
              <td className="px-6 py-4">
                <a
                  href={`mailto:${result.email}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {result.email}
                </a>
              </td>
              <td className="px-6 py-4">
                <a
                  href={result.references}
                  target="_blank"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Link
                </a>
              </td>
              <td className="px-6 py-4">
                {result.status}
              </td>
              <td className="px-6 py-4 flex flex-row">
                <button
                  type="button"
                  className="whitespace-nowrap inline-flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  ref={result.updateDropDownTrigger}
                >
                  Update Status{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
                <div
                  ref={result.updateDropDownTarget}
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-400 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="list-none p-0 m-0 text-sm text-gray-700 dark:text-gray-200">
                    <li className="m-0 p-0">
                      <button
                        className="w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          fetch(`/api/admin/benchmarks/${result.id}`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              status: "approved",
                            }),
                          }).then(() => {
                            updateDisplayedSubmissions();
                          });
                        }}
                      >
                        approved
                      </button>
                    </li>
                    <li className="m-0 p-0">
                      <button
                        className="w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          fetch(`/api/admin/benchmarks/${result.id}`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              status: "rejected",
                            }),
                          }).then(() => {
                            updateDisplayedSubmissions();
                          });
                        }}
                      >
                        rejected
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  onClick={async () => {
                    const jsonText = JSON.stringify(
                      {
                        method: result.method,
                        testAucRoc: result.testAucRoc,
                        testPrecision: result.testPrecision,
                        testRecall: result.testRecall,
                        testF1: result.testF1,
                        contact: {
                          name: result.name,
                          email: result.email,
                        },
                        references: result.references,
                      },
                      null,
                      2,
                    );
                    console.log(jsonText);
                    const queryOpts = {
                      name: "clipboard-write",
                      allowWithoutGesture: false,
                    };
                    const permissionStatus = await navigator.permissions.query(
                      queryOpts,
                    );
                    if (permissionStatus.state === "granted") {
                      navigator.clipboard.writeText(jsonText);
                    } else {
                      alert(
                        "Please copy the JSON from dev tools manually. Your browser does not support copying to clipboard.",
                      );
                    }
                  }}
                >
                  Copy JSON
                </button>
                <button
                  type="button"
                  className="whitespace-nowrap text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => {
                    fetch(`/api/admin/benchmarks/${result.id}`, {
                      method: "DELETE",
                    }).then(() => {
                      updateDisplayedSubmissions();
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;