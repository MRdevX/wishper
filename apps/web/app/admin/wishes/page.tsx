"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { Plus, Search, Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Wish {
  id: string;
  title: string;
  description?: string;
  price?: number;
  url?: string;
  imageUrl?: string;
  priority: "low" | "medium" | "high";
  isPurchased: boolean;
  owner: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  wishlist?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await apiClient.getWishes();
      if (response.success && response.data) {
        setWishes(response.data as Wish[]);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWishes = wishes.filter(
    (wish) =>
      wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteWish = async (wishId: string) => {
    if (!confirm("Are you sure you want to delete this wish?")) return;

    try {
      const response = await apiClient.deleteWish(wishId);
      if (response.success) {
        setWishes(wishes.filter((wish) => wish.id !== wishId));
      }
    } catch (error) {
      console.error("Error deleting wish:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishes</h1>
          <p className="text-gray-600 mt-2">Manage wish items</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading wishes...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishes</h1>
          <p className="text-gray-600 mt-2">Manage wish items</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Wish
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Wishes</CardTitle>
          <CardDescription>A list of all wishes in your application</CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search wishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredWishes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No wishes found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Owner</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWishes.map((wish) => (
                    <tr key={wish.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{wish.title}</div>
                          {wish.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{wish.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div className="font-medium">
                            {wish.owner.firstName && wish.owner.lastName
                              ? `${wish.owner.firstName} ${wish.owner.lastName}`
                              : "No name"}
                          </div>
                          <div className="text-gray-500">{wish.owner.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getPriorityColor(wish.priority)}>{wish.priority}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">{wish.price ? `$${wish.price.toFixed(2)}` : "Not set"}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={wish.isPurchased ? "default" : "secondary"}>
                          {wish.isPurchased ? "Purchased" : "Available"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-500">{new Date(wish.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {wish.url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={wish.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteWish(wish.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
