import { fail, redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    // Handle missing session

    const formData = await request.formData();

    const name = formData.get('name') as string
    const notes = formData.get('notes') as string
    if (!name) {
      return fail(400, {
        name, notes,
      })
    }

    const { error, data } = await supabase.from('tracks').insert({
      owner: session?.user.id,
      name,
      notes,
      created_at: new Date(),
    }).select().single()

    if (error) {
      console.error(error);
      return fail(500, {
        name, notes
      })
    }

    throw redirect(303, `/track/${data.id}`)
  }
}