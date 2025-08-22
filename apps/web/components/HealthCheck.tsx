"use client";

import { useState, useEffect } from "react";
import { apiClient } from "../lib/api";
import { HealthResponse } from "../types/api";
import { Button } from "@repo/ui/button";

export function HealthCheck() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.health();
      setHealth(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check health");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">API Health Check</h3>

      {loading && <p>Checking API health...</p>}

      {error && (
        <div className="text-red-600 mb-2">
          <p>Error: {error}</p>
          <Button onClick={checkHealth} className="mt-2">
            Retry
          </Button>
        </div>
      )}

      {health && (
        <div className="text-green-600">
          <p>Status: {health.status}</p>
          {health.timestamp && <p>Timestamp: {health.timestamp}</p>}
        </div>
      )}
    </div>
  );
}
