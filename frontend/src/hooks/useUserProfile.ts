import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/app/types/auth';

export function useUserProfile(userId: number | undefined) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    if (!userId) {
			console.log(11)
      return;
    }

    try {
			setLoading(true);

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUserProfile({
        id: userId,
        name: data?.name || "No Name",
        bio: data?.bio || null,
        avatar_url: data?.avatar_url || null,
        email: data?.email || null,
      });
    } catch (error) {
			console.log(`Failed to fetch user profile: ${error}`);
    } finally {
			setLoading(false);
		}
  }, [userId]);

	useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

	const updateProfile = useCallback(async(data: Partial<UserProfile>) => {
		if (!userId) return;

		try {
			setLoading(true);

			const { error } = await supabase
				.from('user_profiles')
				.update(data)
				.eq('id', userId)
			
			if (error) throw error;

			setUserProfile(prev => prev ? {
				...prev,
				...data,

				name: data.name || prev.name || "No Name",
				bio: data.bio ?? prev.bio ?? null,
				avatar_url: data.avatar_url ?? prev.avatar_url ?? null,
        email: data.email ?? prev.email ?? null,
			} : null)
		} catch (error) {
			console.log(`Failed to update user profile${error}`);
		} finally {
			setLoading(false)
		}
	}, [userId]);

	const refetch = useCallback(() => fetchUserProfile(), [fetchUserProfile]);

  return { userProfile, loading, updateProfile, refetch }; 
}