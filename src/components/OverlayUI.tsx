"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ARTIFACTS, MEMBERS, POLICY_TIMELINE, ROOMS, SOURCES } from "@/data/museumData";
import { useStore } from "@/store/useStore";

const QUIZ = [
  {
    text: "Kim Ngọc là người trực tiếp ký Nghị quyết 68.",
    answer: false,
    explanation: "Trần Quốc Phi ký sau khi Ban Thường vụ thống nhất; Kim Ngọc chủ trì, định hướng và thúc đẩy.",
  },
  {
    text: "Khoán hộ năm 1966 đồng nghĩa chuyển quyền sở hữu ruộng đất cho hộ.",
    answer: false,
    explanation: "Cốt lõi là đổi trách nhiệm và quyền lợi trong khung hợp tác xã, không phải tư hữu hóa đất đai.",
  },
  {
    text: "Khoán 100 và Khoán 10 là bản sao nguyên xi của thử nghiệm Vĩnh Phúc.",
    answer: false,
    explanation: "Đây là chuỗi điều chỉnh chính sách trong bối cảnh và phạm vi khác, không phải sao chép nguyên xi.",
  },
];

const MATCHES = [
  ["160", "Số HTX đạt mức năng suất được ghi nhận"],
  ["≈70%", "Tỷ trọng trong tổng số HTX"],
  ["5–7+", "Tấn/ha bình quân của nhóm HTX này"],
  ["222.000", "Tấn lương thực quy thóc năm 1967"],
] as const;

type Panel = "sources" | "members" | "quiz" | "game" | "timeline" | null;

function OpeningVote() {
  const vote = useStore((state) => state.debateVote);
  const setVote = useStore((state) => state.setDebateVote);
  if (vote) return null;
  return (
    <motion.div className="vote-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.section className="vote-card" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-labelledby="vote-title">
        <p className="kicker">TRƯỚC KHI BƯỚC VÀO</p>
        <h1 id="vote-title">Giao khoán tới hộ: tiến bộ hay thụt lùi?</h1>
        <p>Hãy chọn theo trực giác. Cuối hành trình, bảo tàng sẽ hỏi lại bạn bằng dữ kiện và bối cảnh.</p>
        <div className="vote-options">
          <button onClick={() => setVote("progress")}>
            <strong>Tiến bộ</strong>
            <span>Gắn trách nhiệm với kết quả</span>
          </button>
          <button onClick={() => setVote("regression")}>
            <strong>Thụt lùi</strong>
            <span>Có nguy cơ làm suy yếu tập thể</span>
          </button>
        </div>
        <small>Lựa chọn được lưu trên thiết bị này, không gửi lên máy chủ.</small>
      </motion.section>
    </motion.div>
  );
}

function ArtifactPanel() {
  const artifact = useStore((state) => state.getActiveArtifact());
  const setActiveArtifact = useStore((state) => state.setActiveArtifact);
  return (
    <AnimatePresence>
      {artifact && (
        <motion.aside className="artifact-panel" initial={{ x: "110%" }} animate={{ x: 0 }} exit={{ x: "110%" }} transition={{ type: "spring", damping: 27 }} aria-live="polite">
          <button className="icon-button close-button" onClick={() => setActiveArtifact(null)} aria-label="Đóng hiện vật">×</button>
          {artifact.imageUrl && (
            <div className="artifact-image">
              <Image src={artifact.imageUrl} alt={artifact.title} fill sizes="(max-width: 720px) 100vw, 460px" priority />
            </div>
          )}
          <div className="artifact-copy">
            <p className="kicker">{artifact.eyebrow}</p>
            <p className="artifact-date">{artifact.date}</p>
            <h2>{artifact.title}</h2>
            <p>{artifact.description}</p>
            <blockquote>{artifact.takeaway}</blockquote>
            {(artifact.credit || artifact.sourceUrl) && (
              <div className="provenance">
                {artifact.credit && <p>{artifact.credit}</p>}
                {artifact.rightsNote && <p>{artifact.rightsNote}</p>}
                {artifact.sourceUrl && <a href={artifact.sourceUrl} target="_blank" rel="noreferrer">Mở trang nguồn ↗</a>}
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function MatchGame() {
  const [number, setNumber] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("Chọn một con số, rồi chọn ý nghĩa tương ứng.");
  const meanings = useMemo(() => [...MATCHES.map((item) => item[1])].sort((a, b) => b.localeCompare(a)), []);
  const chooseMeaning = (meaning: string) => {
    if (!number) return;
    const correct = MATCHES.find((item) => item[0] === number)?.[1];
    if (correct === meaning) {
      setMatched((current) => ({ ...current, [number]: meaning }));
      setMessage("Chính xác. Tiếp tục với con số khác.");
      setNumber(null);
    } else setMessage("Chưa đúng — hãy thử ghép lại.");
  };
  return (
    <div className="game-layout">
      <p className="game-status" aria-live="polite">{message}</p>
      <div className="match-columns">
        <div>
          <h3>Con số</h3>
          {MATCHES.map(([value]) => (
            <button key={value} disabled={Boolean(matched[value])} className={number === value ? "selected" : ""} onClick={() => setNumber(value)}>{value}{matched[value] ? " ✓" : ""}</button>
          ))}
        </div>
        <div>
          <h3>Ý nghĩa</h3>
          {meanings.map((meaning) => (
            <button key={meaning} disabled={Object.values(matched).includes(meaning)} onClick={() => chooseMeaning(meaning)}>{meaning}</button>
          ))}
        </div>
      </div>
      {Object.keys(matched).length === 4 && <strong className="game-complete">Hoàn thành 4/4 — các số liệu đều thuộc cuối năm 1967.</strong>}
    </div>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState<Array<boolean | null>>([null, null, null]);
  return (
    <div className="quiz-list">
      {QUIZ.map((item, index) => {
        const answer = answers[index];
        return (
          <article key={item.text}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item.text}</p>
            <div>
              <button onClick={() => setAnswers((current) => current.map((value, i) => i === index ? true : value))}>Đúng</button>
              <button onClick={() => setAnswers((current) => current.map((value, i) => i === index ? false : value))}>Sai</button>
            </div>
            {answer !== null && <small className={answer === item.answer ? "correct" : "incorrect"}>{answer === item.answer ? "Chính xác. " : "Chưa chính xác. "}{item.explanation}</small>}
          </article>
        );
      })}
    </div>
  );
}

function Timeline() {
  const [active, setActive] = useState(0);
  return (
    <div className="timeline-widget">
      <div className="timeline-years">
        {POLICY_TIMELINE.map((item, index) => <button key={item.year} className={index === active ? "active" : ""} onClick={() => setActive(index)}>{item.year}</button>)}
      </div>
      <motion.div key={active} className="timeline-detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="kicker">{POLICY_TIMELINE[active].year}</p>
        <h3>{POLICY_TIMELINE[active].title}</h3>
        <p>{POLICY_TIMELINE[active].text}</p>
      </motion.div>
      <p className="timeline-caveat">Đây là quá trình điều chỉnh chính sách, không phải đường thẳng sao chép Nghị quyết 68.</p>
    </div>
  );
}

function Modal({ panel, close }: { panel: Exclude<Panel, null>; close: () => void }) {
  const titles = { sources: "Nguồn và quyền sử dụng", members: "Nhóm thực hiện", quiz: "Kiểm tra ba lầm tưởng", game: "Ghép số cuối năm 1967", timeline: "Dòng chính sách 1966–1988" };
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}>
      <motion.section className="content-modal" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onMouseDown={(event) => event.stopPropagation()} aria-modal="true" role="dialog" aria-label={titles[panel]}>
        <button className="icon-button close-button" onClick={close} aria-label="Đóng">×</button>
        <p className="kicker">BẢO TÀNG KHOÁN HỘ VĨNH PHÚC</p>
        <h2>{titles[panel]}</h2>
        {panel === "game" && <MatchGame />}
        {panel === "timeline" && <Timeline />}
        {panel === "quiz" && <Quiz />}
        {panel === "sources" && <div className="source-list">{SOURCES.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><b>↗</b></a>)}<p className="rights-warning">Ảnh tư liệu từ báo chí/bảo tàng được dùng cho bản trình diễn giáo dục với credit rõ ràng. Các trang nguồn không công bố giấy phép mở; cần xin phép trước khi phát hành thương mại hoặc tái phân phối ảnh.</p></div>}
        {panel === "members" && <div className="member-grid">{MEMBERS.map((member) => <div key={member}>{member}</div>)}</div>}
      </motion.section>
    </motion.div>
  );
}

export default function OverlayUI() {
  const activeRoomId = useStore((state) => state.activeRoomId);
  const setActiveRoom = useStore((state) => state.setActiveRoom);
  const visited = useStore((state) => state.visitedArtifactIds);
  const vote = useStore((state) => state.debateVote);
  const room = ROOMS.find((item) => item.id === activeRoomId) ?? ROOMS[0];
  const roomArtifacts = ARTIFACTS.filter((item) => item.roomId === activeRoomId);
  const [panel, setPanel] = useState<Panel>(null);

  return (
    <div className="ui-layer">
      <header className="museum-header">
        <button className="brand" onClick={() => setActiveRoom("main-hall")}>
          <span>KH</span>
          <div><b>Khoán hộ Vĩnh Phúc</b><small>Bảo tàng số 3D • 1963–1988</small></div>
        </button>
        <nav aria-label="Thông tin bảo tàng">
          <button onClick={() => setPanel("sources")}>Nguồn</button>
          <button onClick={() => setPanel("members")}>Nhóm</button>
          <button className="primary-action" onClick={() => setPanel("quiz")}>Quiz cuối hành trình</button>
        </nav>
      </header>

      <section className="room-intro" aria-live="polite">
        <p className="kicker">PHÒNG {room.index} • {room.period}</p>
        <h1>{room.name}</h1>
        <p>{room.description}</p>
        <blockquote>{room.question}</blockquote>
        {vote && activeRoomId === "main-hall" && <small>Lựa chọn ban đầu của bạn: <b>{vote === "progress" ? "Tiến bộ" : "Thụt lùi"}</b></small>}
      </section>

      <aside className="artifact-index" aria-label="Danh sách hiện vật trong phòng">
        <span>{visited.length}/{ARTIFACTS.length} đã khám phá</span>
        {roomArtifacts.map((artifact) => (
          <button key={artifact.id} onClick={() => useStore.getState().setActiveArtifact(artifact.id)} className={visited.includes(artifact.id) ? "visited" : ""}>
            <i style={{ background: artifact.color }} />
            <span><small>{artifact.date}</small>{artifact.title}</span>
          </button>
        ))}
      </aside>

      <div className="context-actions">
        {activeRoomId === "room-turning-point" && <button onClick={() => setPanel("game")}>Ghép số 1967</button>}
        {activeRoomId === "room-policy" && <button onClick={() => setPanel("timeline")}>Mở timeline</button>}
      </div>

      <nav className="room-nav" aria-label="Điều hướng phòng trưng bày">
        {ROOMS.map((item) => (
          <button key={item.id} className={item.id === activeRoomId ? "active" : ""} onClick={() => setActiveRoom(item.id)}>
            <span>{item.index}</span>
            <div><b>{item.name}</b><small>{item.period}</small></div>
          </button>
        ))}
      </nav>

      <p className="scene-hint">Bấm vào hiện vật 3D hoặc danh sách để đọc câu chuyện.</p>
      <ArtifactPanel />
      <OpeningVote />
      <AnimatePresence>{panel && <Modal panel={panel} close={() => setPanel(null)} />}</AnimatePresence>
    </div>
  );
}
