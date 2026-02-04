import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Phone, Video, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Input } from '../lib/components/Input';
import { Avatar } from '../lib/components/Avatar';
import { useAuth } from '../lib/providers/AuthProvider';
import { supabase } from '../lib/supabase';

interface Contact {
  id: string;
  full_name: string;
  avatar_url?: string;
  last_active?: string;
}

export default function ContactsPage() {
  const router = useRouter();
  const { callType } = router.query;
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, last_active')
      .order('full_name');

    if (!error && data) {
      setContacts(data);
    }
    setLoading(false);
  };

  const initiateCall = (userId: string) => {
    router.push(`/call?userId=${userId}&type=${callType}`);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Select Contact - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-[#0a0a0f]">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-white">
                {callType === 'video' ? 'Video Call' : 'Voice Call'}
              </h1>
              <button
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="search"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="max-w-3xl mx-auto px-4 py-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="p-4 flex items-center">
                    <div className="w-12 h-12 bg-gray-700 rounded-full" />
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-700 rounded w-1/3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card
                    hover
                    className="cursor-pointer"
                    onClick={() => initiateCall(contact.id)}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={contact.avatar_url}
                          fallback={contact.full_name}
                          size="lg"
                        />
                        <div>
                          <h3 className="text-white font-medium">
                            {contact.full_name}
                          </h3>
                          {contact.last_active && (
                            <p className="text-sm text-gray-400">
                              Last active {new Date(contact.last_active).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {callType === 'video' ? (
                          <Video className="text-purple-400" size={20} />
                        ) : (
                          <Phone className="text-purple-400" size={20} />
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No contacts found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}