'use client';

import { useState } from 'react';
import { Download, Share2, Mail, Loader2 } from 'lucide-react';
import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

interface ExportShareButtonsProps {
  onExportPDF: () => Promise<void>;
  shareData: {
    title: string;
    text: string;
    url?: string;
  };
  emailData?: {
    subject: string;
    body: string;
  };
  onEmailSend?: () => Promise<void>;
  variant?: 'default' | 'compact';
}

export function ExportShareButtons({
  onExportPDF,
  shareData,
  emailData,
  onEmailSend,
  variant = 'default'
}: ExportShareButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await onExportPDF();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Eroare la exportul PDF. Te rugăm să încerci din nou.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);

      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        const textToShare = `${shareData.title}\n\n${shareData.text}${shareData.url ? `\n\n${shareData.url}` : ''}`;
        await navigator.clipboard.writeText(textToShare);
        alert('Link copiat în clipboard!');
      }
    } catch (error: any) {
      // User cancelled the share, ignore the error
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        alert('Eroare la partajare. Te rugăm să încerci din nou.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleEmail = async () => {
    if (!emailData && !onEmailSend) return;

    try {
      setIsSendingEmail(true);

      if (onEmailSend) {
        // Use API route to send email
        await onEmailSend();
      } else if (emailData) {
        // Fallback: Open mailto link
        const mailtoLink = `mailto:?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
        window.location.href = mailtoLink;
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Eroare la trimiterea email-ului. Te rugăm să încerci din nou.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (variant === 'compact') {
    return (
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="h-8 w-8 p-0"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exportă PDF</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                disabled={isSharing}
                className="h-8 w-8 p-0"
              >
                {isSharing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Partajează</p>
            </TooltipContent>
          </Tooltip>

          {(emailData || onEmailSend) && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmail}
                  disabled={isSendingEmail}
                  className="h-8 w-8 p-0"
                >
                  {isSendingEmail ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trimite email</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        disabled={isExporting}
        className="gap-2"
      >
        {isExporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Se exportă...</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span>Exportă PDF</span>
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        disabled={isSharing}
        className="gap-2"
      >
        {isSharing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Se partajează...</span>
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            <span>Partajează</span>
          </>
        )}
      </Button>

      {(emailData || onEmailSend) && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleEmail}
          disabled={isSendingEmail}
          className="gap-2"
        >
          {isSendingEmail ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Se trimite...</span>
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
