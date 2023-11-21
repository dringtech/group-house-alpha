export async function load({ parent }) {
  const { supabase } = await parent();
  const { data: tracks } = await supabase
    .from('tracks')
    .select('name, created_at, id')
  
  return {
    tracks,
  }
}