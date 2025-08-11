-- Seed/test data for evaluation schema
insert into public.participants (participant_id,email,name,specialty,years_practice,region,consent)
values ('test@example.com','test@example.com','Test User','internal-medicine','3-5','India',true)
on conflict (participant_id) do update set updated_at=now();

insert into public.sessions (session_id,participant_id,app_version,question_set_version,random_seed,ua,referer,ip)
values ('00000000-0000-0000-0000-000000000001','test@example.com','dev',1,42,'cli','local','127.0.0.1')
on conflict (session_id) do nothing;

insert into public.questions (question_id,prompt_text,optionA_text,optionB_text,sourceA_id,sourceB_id,active)
values ('q-demo','Test prompt','Option A text','Option B text','Answer','AnswerByLLM',true)
on conflict (question_id) do nothing;

insert into public.responses (response_id,session_id,participant_id,question_id,shown_order,choice,feedback_text,time_started,time_spent_ms,sourceA_id_at_eval,sourceB_id_at_eval,optionA_text_hash,optionB_text_hash)
values ('00000000-0000-0000-0000-000000000001:q-demo','00000000-0000-0000-000000000001','test@example.com','q-demo','A|B','A','Looks good', now() - interval '10 seconds', 10000, 'Answer', 'AnswerByLLM', 'hashA','hashB')
on conflict (response_id) do update set feedback_text=excluded.feedback_text, updated_at=now();
