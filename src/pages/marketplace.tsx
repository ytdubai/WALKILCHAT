import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/providers/AuthProvider';
import { FilterBar } from '../components/marketplace/FilterBar';
import { CategoryChips } from '../components/marketplace/CategoryChips';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { supabase } from '../lib/supabase';

const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Beauty',
  'Sports',
  'Books',
  'Food',
  'Services',
];

const ITEMS_PER_PAGE = 20;

export default function MarketplacePage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedCategory, selectedLocation, minPrice, maxPrice]);

  const loadProducts = async (loadMore = false) => {
    const currentPage = loadMore ? page + 1 : 1;
    setLoading(true);

    let query = supabase
      .from('listings')
      .select('*, profiles:user_id(full_name, rating, location)')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .range(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE - 1
      );

    // Apply filters
    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }
    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }
    if (selectedLocation) {
      query = query.eq('profiles.location', selectedLocation);
    }
    if (minPrice > 0) {
      query = query.gte('price', minPrice);
    }
    if (maxPrice > 0) {
      query = query.lte('price', maxPrice);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error loading products:', error);
      return;
    }

    // Transform data
    const formattedProducts = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      currency: product.currency,
      images: product.images,
      isNegotiable: product.is_negotiable,
      seller: {
        name: product.profiles.full_name,
        rating: product.profiles.rating || 0,
        location: product.profiles.location,
      },
    }));

    if (loadMore) {
      setProducts((prev) => [...prev, ...formattedProducts]);
      setPage(currentPage);
    } else {
      setProducts(formattedProducts);
      setPage(1);
    }

    setHasMore(data.length === ITEMS_PER_PAGE);
    setLoading(false);
  };

  const handleContactSeller = (productId: string) => {
    router.push(`/messages?product=${productId}`);
  };

  return (
    <>
      <Head>
        <title>Marketplace - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Filters */}
        <FilterBar
          onSearch={setSearchQuery}
          onPriceRange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
          onLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />

        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <CategoryChips
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Products */}
          <div className="px-4 pb-8">
            <ProductGrid
              products={products}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={() => loadProducts(true)}
              onContactSeller={handleContactSeller}
            />
          </div>
        </div>
      </div>
    </>
  );
}