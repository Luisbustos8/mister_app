/** @format */

import { useEffect, useState } from "react";

import type { Rival } from "../services/queries/addRival";
import {
  getRivalById,
  getRivalNotes,
  saveRivalNote,
} from "../services/queries/rivalService";

type RivalNote = {
  id: string;
  rival_id: string;
  note: string;
};

export function useRivalDetail(rivalId: string | undefined) {
  const [rival, setRival] = useState<Rival | null>(null);
  const [notes, setNotes] = useState<RivalNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!rivalId) return;

    const fetch = async () => {
      setLoading(true);
      const { data: rivalData } = await getRivalById(rivalId);
      const { data: notesData } = await getRivalNotes(rivalId);

      setRival(rivalData || null);
      setNotes(notesData || []);
      setLoading(false);
    };

    fetch();
  }, [rivalId]);

  const saveNotes = async (newNotes: string[]) => {
    setSaving(true);
    const trimmed = newNotes.map((n) => n.trim()).filter(Boolean);

    for (const note of trimmed) {
      await saveRivalNote(rivalId!, note);
    }

    const { data: updatedNotes } = await getRivalNotes(rivalId!);
    setNotes(updatedNotes || []);
    setSaving(false);
  };

  return {
    rival,
    notes,
    loading,
    saving,
    saveNotes,
  };
}
