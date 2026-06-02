
import React, { useState } from "react";
import SectionTitle from "./TestSectionTitle";
import StatusMessage from "./TestStatusMessage";
import StoryCardContainer from "./TestStoryCardContainer";
import testSiteConfig from "./testSiteConfig";

const StatusTestSuite = () => {
  const [activeTest, setActiveTest] = useState("all");
  const { testData } = testSiteConfig; // testSiteConfig kullan

  const testCases = {
    loading: {
      title: "Loading Durumu",
      data: { loading: true, error: null, partners: null }
    },
    error: {
      title: "Error Durumu", 
      data: { loading: false, error: testData.partners.error, partners: null }
    },
    empty: {
      title: "Boş Data",
      data: { loading: false, error: null, partners: testData.partners.emptyData }
    },
    null: {
      title: "Null Data",
      data: { loading: false, error: null, partners: testData.partners.nullData }
    },
    success: {
      title: "Başarılı Data",
      data: { loading: false, error: null, partners: testData.partners.mockPartners }
    }
  };

  const renderTest = (testKey, showTitle = false) => {
    const test = testCases[testKey];
    const { loading, error, partners } = test.data;

    return (
      <div key={testKey} className="mb-8 p-6 border-2 border-gray-200 rounded-lg">
        {showTitle && (
          <h3 className="text-xl font-semibold mb-4 text-blue-600">{test.title}</h3>
        )}
        
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div><strong>Loading:</strong> {loading.toString()}</div>
            <div><strong>Error:</strong> {error || "null"}</div>
            <div><strong>Data:</strong> {partners ? `${partners.length} items` : "null"}</div>
          </div>
        </div>

        {/* StatusMessage Testi */}
        <div className="mb-4">
          <h4 className="font-medium mb-2">StatusMessage Component:</h4>
          <StatusMessage
            loading={loading}
            error={error}
            data={partners}
            emptyMessage="Firma bulunamadı..."
          />
        </div>

        {/* StoryCardContainer Testi */}
        <div>
          <h4 className="font-medium mb-2">StoryCardContainer Component:</h4>
          {!loading && !error && partners && partners.length > 0 ? (
            <StoryCardContainer partners={partners} />
          ) : (
            <div className="text-gray-500 italic">
              {loading && "Loading... (StoryCardContainer gösterilmiyor)"}
              {error && `Error: ${error} (StoryCardContainer gösterilmiyor)`}
              {!loading && !error && (!partners || partners.length === 0) && 
                "Boş data (StoryCardContainer gösterilmiyor)"}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle
        title="Status Test Merkezi"
        subtitle="Tüm durumları tek sayfada test edin"
      />

      {/* Test Seçici */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Durumu Seçin:</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTest("all")}
            className={`px-4 py-2 rounded ${
              activeTest === "all" ? "bg-blue-600 text-white" : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            TÜM TESTLER
          </button>
          
          {Object.keys(testCases).map((testKey) => (
            <button
              key={testKey}
              onClick={() => setActiveTest(testKey)}
              className={`px-4 py-2 rounded ${
                activeTest === testKey ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {testCases[testKey].title}
            </button>
          ))}
        </div>
      </div>

      {/* Test Sonuçları */}
      <div>
        {activeTest === "all" ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Tüm Test Durumları</h2>
            {Object.keys(testCases).map((testKey) => renderTest(testKey, true))}
          </div>
        ) : (
          renderTest(activeTest, true)
        )}
      </div>
    </div>
  );
};

export default StatusTestSuite;