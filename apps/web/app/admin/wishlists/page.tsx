"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { Plus, Search, Edit, Trash2, Eye, Gift } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Wishlist {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  owner: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  wishes?: {
    id: string;
    title: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const response = await apiClient.getWishlists();
      if (response.success && response.data) {
        setWishlists(response.data as Wishlist[]);
      }
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWishlists = wishlists.filter(
    (wishlist) =>
      wishlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wishlist.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wishlist.owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteWishlist = async (wishlistId: string) => {
    if (!confirm("Are you sure you want to delete this wishlist?")) return;

    try {
      const response = await apiClient.deleteWishlist(wishlistId);
      if (response.success) {
        setWishlists(wishlists.filter((wishlist) => wishlist.id !== wishlistId));
      }
    } catch (error) {
      console.error("Error deleting wishlist:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishlists</h1>
          <p className="text-gray-600 mt-2">Manage wishlists</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading wishlists...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishlists</h1>
          <p className="text-gray-600 mt-2">Manage wishlists</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Wishlist
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Wishlists</CardTitle>
          <CardDescription>A list of all wishlists in your application</CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search wishlists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredWishlists.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No wishlists found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Owner</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Visibility</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Wishes Count</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWishlists.map((wishlist) => (
                    <tr key={wishlist.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{wishlist.name}</div>
                          {wishlist.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{wishlist.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div className="font-medium">
                            {wishlist.owner.firstName && wishlist.owner.lastName
                              ? `${wishlist.owner.firstName} ${wishlist.owner.lastName}`
                              : "No name"}
                          </div>
                          <div className="text-gray-500">{wishlist.owner.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={wishlist.isPublic ? "default" : "secondary"}>
                          {wishlist.isPublic ? "Public" : "Private"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Gift className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="text-sm">{wishlist.wishes?.length || 0} wishes</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-500">{new Date(wishlist.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteWishlist(wishlist.id)}
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
