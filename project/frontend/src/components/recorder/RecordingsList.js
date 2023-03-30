import useRecordingsList from "../../hooks/use-recordings-list.js";
import { Icon24DeleteOutline } from '@vkontakte/icons';
import { Spacing, Subhead, Title } from "@vkontakte/vkui";

export default function RecordingsList({ audio }) {
  const { recordings, deleteAudio } = useRecordingsList(audio);
  
  return (
    <div>
      {recordings.length > 0 ? (
        <>
          <Title level="2">
            Записи
          </Title>
          <Spacing size={30} />
          <div>
            {recordings.map((record, index) => (
              <>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }} key={index}>
                  <audio controls src={record.audio} />
                  <Icon24DeleteOutline onClick={() => deleteAudio(record.key)} width={32} height={32} fill="#999" />
                </div>
                <Spacing size={20} />
              </>
            ))}
          </div>
        </>
      ) : (
        <Subhead style={{
          fontSize: "20px",
          color: "#999",
          textAlign: "center"
        }}>
          Записи отсутствуют
        </Subhead>
      )}
    </div>
  );
}
