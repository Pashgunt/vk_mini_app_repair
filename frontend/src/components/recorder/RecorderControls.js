import { formatMinutes, formatSeconds } from "../../utils/format-time";
import { Icon48Play, Icon28CancelCircleOutline, Icon28SoundWaveOutline, Icon24Download } from "@vkontakte/icons";
import { Spacing, Title } from "@vkontakte/vkui";
export default function RecorderControls({ recorderState, handlers }) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <Title level="1" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}>
        {initRecording && <Icon28SoundWaveOutline fill="red" width={120} height={120} />}
        <Spacing size={10} />
        <div>
          <span>{formatMinutes(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recordingSeconds)}</span>
        </div>
      </Title>
      <Spacing size={20} />
      <div style={{
        display: "flex"
      }}>
        {initRecording && <Icon28CancelCircleOutline onClick={cancelRecording} width={64} height={64} fill="#999"  style={{
          marginRight:"20px"
        }}/>}
        {initRecording ? (
          (recordingSeconds !== 0 || recordingMinutes !== 0) && <Icon24Download onClick={saveRecording} width={64} height={64} fill="#999" />
        ) : (
          <Icon48Play onClick={startRecording} width={64} height={64} fill="#999" />
        )}
      </div>
    </div>
  );
}
