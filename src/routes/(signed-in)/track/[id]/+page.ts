export async function load ({ parent, params }) {
  const { supabase } = await parent();
  const { id } = params;

  const { data: track } = await supabase
    .from('tracks')
    .select('name, notes, created_at')
    .eq('id', id)
    .single();

  return {
    id,
    track,
  }
}