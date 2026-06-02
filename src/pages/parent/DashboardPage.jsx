import React from "react";

export default function ParentDashboard() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.title}>부모 리포트</div>
          <div style={styles.sub}>아이의 성장 데이터를 한눈에</div>
        </div>
        <div style={styles.mode}>부모 모드</div>
      </header>

      <section style={styles.summaryGrid}>
        <Summary label="미션" value="6/8" />
        <Summary label="연속" value="5일" />
        <Summary label="포인트" value="420P" />
        <Summary label="레벨" value="Lv.3" />
      </section>

      <Card title="📚 독서 리포트">
        <Row label="이번 주 읽은 책" value="4권" />
        <Row label="총 독서 시간" value="85분" />
        <div style={styles.note}>
          오늘의 한 줄 기록<br />
          “강아지가 달 보러 간 게 신기했어요.”
        </div>
      </Card>

      <Card title="✏️ 오늘의 일기">
        <div style={styles.diaryBox}>
          오늘 비가 와서 우산을 쓰고 학교에 갔어요 ☔
        </div>
      </Card>

      <Card title="😊 감정 리포트">
        <Emotion label="행복" emoji="😊" percent={55} />
        <Emotion label="피곤" emoji="😴" percent={25} />
        <Emotion label="속상함" emoji="😢" percent={10} />
        <Emotion label="짜증" emoji="😠" percent={10} />
      </Card>

      <Card title="💰 용돈 리포트">
        <Row label="현재 잔액" value="12,500원" />
        <Row label="이번 주 받은 용돈" value="+5,000원" />
        <Row label="미션 보상" value="+2,500원" />
        <Row label="사용 금액" value="-3,000원" />

        <div style={styles.goalBox}>
          <div style={styles.goalTop}>
            <b>저금 목표: 레고 사기 🧱</b>
            <span>39%</span>
          </div>
          <Progress percent={39} />
          <div style={styles.smallText}>32,000원 중 12,500원 모았어요</div>
        </div>
      </Card>

      <Card title="🔔 승인 대기">
        <Approval text="책 30분 읽기 완료 → 300원 지급" />
        <Approval text="레고 구입 3,000원 사용 요청" />
      </Card>

      <Card title="🎁 이번 주 추천">
        <Recommend
          title="추천 보상"
          text="이번 주 미션 달성률이 좋아요. 스티커북이나 작은 장난감을 추천해요."
        />
        <Recommend
          title="추천 활동"
          text="피곤함 기록이 조금 있어요. 주말에는 가까운 공원 산책이나 실내 키즈카페가 좋아요."
        />
      </Card>

      <nav style={styles.nav}>
        <Tab active label="리포트" icon="📊" />
        <Tab label="커뮤니티" icon="💬" />
        <Tab label="GPS" icon="📍" />
        <Tab label="설정" icon="⚙️" />
      </nav>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section style={styles.card}>
      <h2 style={styles.cardTitle}>{title}</h2>
      {children}
    </section>
  );
}

function Summary({ label, value }) {
  return (
    <div style={styles.summary}>
      <div style={styles.summaryLabel}>{label}</div>
      <div style={styles.summaryValue}>{value}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={styles.row}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function Emotion({ emoji, label, percent }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={styles.emotionTop}>
        <span>
          {emoji} {label}
        </span>
        <b>{percent}%</b>
      </div>
      <Progress percent={percent} />
    </div>
  );
}

function Progress({ percent }) {
  return (
    <div style={styles.progressBg}>
      <div style={{ ...styles.progressFill, width: `${percent}%` }} />
    </div>
  );
}

function Approval({ text }) {
  return (
    <div style={styles.approval}>
      <span>{text}</span>
      <button style={styles.button}>승인</button>
    </div>
  );
}

function Recommend({ title, text }) {
  return (
    <div style={styles.recommend}>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}

function Tab({ icon, label, active }) {
  return (
    <div style={{ ...styles.tab, color: active ? "#111" : "#aaa" }}>
      <div>{icon}</div>
      <span>{label}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8F7F3",
    padding: "20px 18px 88px",
    fontFamily: "sans-serif",
    color: "#222",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
  },
  sub: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  mode: {
    fontWeight: 700,
    fontSize: 14,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    marginBottom: 18,
  },
  summary: {
    background: "#fff",
    borderRadius: 16,
    padding: "12px 6px",
    textAlign: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#7B61FF",
    fontWeight: 700,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 800,
    marginTop: 4,
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    border: "1px solid #eee",
  },
  cardTitle: {
    fontSize: 17,
    margin: "0 0 14px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "9px 0",
    borderBottom: "1px solid #f1f1f1",
    fontSize: 14,
  },
  note: {
    background: "#FFF9E8",
    padding: 14,
    borderRadius: 14,
    marginTop: 12,
    fontSize: 14,
    lineHeight: 1.5,
  },
  diaryBox: {
    background: "#F6F3ED",
    padding: 16,
    borderRadius: 16,
    fontSize: 15,
    lineHeight: 1.5,
  },
  emotionTop: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginBottom: 5,
  },
  progressBg: {
    height: 8,
    background: "#EEE",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#FFC857",
    borderRadius: 999,
  },
  goalBox: {
    background: "#F8F7F3",
    padding: 14,
    borderRadius: 16,
    marginTop: 14,
  },
  goalTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
  },
  approval: {
    background: "#F8F7F3",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
  },
  button: {
    border: "none",
    background: "#FFC857",
    borderRadius: 12,
    padding: "7px 12px",
    fontWeight: 700,
  },
  recommend: {
    background: "#F8F7F3",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0 14px",
  },
  tab: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: 700,
  },
}; 